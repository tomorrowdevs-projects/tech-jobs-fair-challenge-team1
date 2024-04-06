<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreRequest;
use App\Http\Requests\Contact\UpdateRequest;
use App\Http\Resources\Contact\ContactResource;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Carica tutti i contatti con i loro dipartimenti
        $contacts = Contact::with('departments');

        // Applica i filtri opzionali
        if ($request->has('name')) {
            $contacts->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if ($request->has('surname')) {
            $contacts->where('surname', 'like', '%' . $request->input('surname') . '%');
        }

        if ($request->has('email')) {
            $contacts->where('email', 'like', '%' . $request->input('email') . '%');
        }

        if ($request->has('company_name')) {
            $contacts->where('company_name', 'like', '%' . $request->input('company_name') . '%');
        }

        if ($request->has('category_id')) {
            $contacts->where('category_id', $request->input('category_id'));
        }

        // Esegui la query e ottieni i contatti paginati
        $contacts = $contacts->paginate($request['qtyForPage']);


        // Restituisci la risorsa dei contatti con i dipartimenti
        return ContactResource::collection($contacts);
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
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        // Crea il nuovo contatto
        $data['create_by_user_id'] = $request->user()->id; // Imposta l'ID dell'utente che ha creato il contatto

        $new_contact = Contact::create($data);

        return ContactResource::make($new_contact);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        // Carica i dipartimenti associati al contatto
        $contact->load('departments');

        return ContactResource::make($contact);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Contact $contact)
    {
        $data = $request->validated();

        $contact->update($data);

        return ContactResource::make($contact);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Contact $contact)
    {
        // Verifica se l'utente è autenticato e ha il permesso di cancellare contatti
        $user = $request->user();
        if (!$user->can('delete', $contact)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Verifica se l'utente è un maintainer
        if ($user->role === 'maintainer') {
            // Verifica se il contatto è stato creato dall'utente
            if ($contact->create_by_user_id !== $user->id) {
                return response()->json(['error' => 'You can only delete contacts created by you'], 403);
            }
        }

        // Se l'utente ha il permesso, cancella il contatto
        $contact->delete();

        return response()->json([
            'message' => 'Contatto eliminato con successo'
        ], 200);
    }
}
