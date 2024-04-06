<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\User\UserResource;
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
        // Recupera tutti gli utenti dal database
        $users = User::all();

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

        return response()->json(compact('newUser', 'token'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
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
        $data = $request->validated();

        // Aggiorna le informazioni dell'utente con i dati validati
        $user->update($data);

        return UserResource::make($user);
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
