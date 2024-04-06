<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\User\UserResource;
use App\Models\Category;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Carica tutti gli utenti con i loro contatti e i dipartimenti associati
        $users = User::with('contacts.departments')->get();

        return UserResource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(StoreRequest $request)
    // {
    //     $data = $request->validated();

    //     $new_user = User::create($data);

    //     return UserResource::make($new_user);
    // }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }


        // Ottenere l'utente autenticato
        $user = auth()->user();

        // Verificare se l'utente ha il ruolo di super-admin
        if ($user->role === 'super-admin') {
            // Se l'utente ha il ruolo di super-admin, permettere qualsiasi ruolo per il nuovo utente
            $allowedRoles = ['admin', 'super-admin', 'maintainer', 'basic'];
        } else {
            // Altrimenti, permettere solo i ruoli 'maintainer' e 'basic'
            $allowedRoles = ['maintainer', 'basic'];
        }

        // Verificare se il ruolo richiesto per il nuovo utente è consentito
        if (!in_array($request->role, $allowedRoles)) {
            return response()->json(['error' => 'Unauthorized role'], 403);
        }

        $newUser = User::create([
            'name' => $request->input('name'),
            'surname' => $request->input('surname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => $request->role,
        ]);

        // Generare il token JWT per il nuovo utente registrato
        $token = JWTAuth::fromUser($newUser);

        $query = Contact::query();
        $query->where('email', '=', $newUser->email);
        $contact = $query->get()->first();

        if (!$query->exists()) {
            $contact['create_by_user_id'] = $newUser->id;
            $contact['name'] = $newUser->name;
            $contact['email'] = $newUser->email;
            $contact['surname'] = $newUser->surname;
            $contact['phone_number'] = "empty";

            $query = Category::query();
            $query->where('name', '=', 'Employers');
            $category = $query->get()->first();
            $contact['category_id'] = $category->id;

            $contact = Contact::create($contact);
        }

        $contactId['contact_id'] = $contact->id;
        $newUser->update($contactId);

        return response()->json(compact('newUser', 'token'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // Carica i contatti e i dipartimenti associati all'utente
        $user->load('contacts.departments');

        return UserResource::make($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, User $user)
    {
        // Utilizza la policy per verificare se l'utente autenticato può effettuare l'aggiornamento
        $this->authorize('update', $user);

        // Se si arriva a questo punto, l'utente ha il permesso necessario per effettuare l'aggiornamento

        // Se l'utente è admin o super-admin, permetti di aggiornare il campo 'role'
        if (auth()->user()->role === 'admin' || auth()->user()->role === 'super-admin') {
            // Aggiorna l'utente con tutti i dati validati
            $user->update($request->validated());
        } else {
            // Altrimenti, l'utente è basic o maintainer e non può modificare il campo 'role'
            // Aggiorna l'utente con tutti i dati eccetto 'role'
            $user->update($request->except('role'));
        }

        // Restituisci la risposta
        return UserResource::make($user);;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'Utente eliminato con successo'
        ], 200);
    }
}
