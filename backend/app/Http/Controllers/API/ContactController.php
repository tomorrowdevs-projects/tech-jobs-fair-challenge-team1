<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        // Recupera tutti gli utenti dal database
        $contacts = Contact::all();

        // Restituisci tutti contatti come risposta JSON
        return response()->json(['contacts' => $contacts]);
    }

    public function show($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['error' => 'Contact not found'], 404);
        }

        return response()->json(['contact' => $contact], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:contacts',
            'phone_number' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'socials' => 'nullable|string',
            'country' => 'nullable|string',
            'region' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'zip_code' => 'nullable|string',
            'piva' => 'nullable|string',
            'vat' => 'nullable|string',
            'sdi' => 'nullable|string',
            'company_name' => 'nullable|string|max:255',
        ]);

        $contact = Contact::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'category_id' => $request->category_id,
            'socials' => $request->socials,
            'country' => $request->country,
            'region' => $request->region,
            'address' => $request->address,
            'city' => $request->city,
            'zip_code' => $request->zip_code,
            'piva' => $request->piva,
            'vat' => $request->vat,
            'sdi' => $request->sdi,
            'company_name' => $request->company_name,
        ]);

        return response()->json(['contact' => $contact], 201);
    }

    public function update(Request $request, $id)
    {
        // Trova il contatto da aggiornare
        $contact = Contact::find($id);

        // Se il contatto non esiste, restituisci un messaggio di errore
        if (!$contact) {
            return response()->json(['error' => 'Contact not found'], 404);
        }

        // Validazione dei dati inviati
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'surname' => 'string|max:255',
            'email' => 'email|max:255|unique:contacts,email,' . $id,
            'phone_number' => 'string|max:255',
            'category_id' => 'integer|exists:categories,id',
            'socials' => 'string|nullable',
            'country' => 'string|nullable',
            'region' => 'string|nullable',
            'address' => 'string|nullable',
            'city' => 'string|nullable',
            'zip_code' => 'string|nullable',
            'piva' => 'string|nullable',
            'vat' => 'string|nullable',
            'sdi' => 'string|nullable',
            'company_name' => 'nullable|string|max:255',
        ]);

        // Aggiorna le informazioni del contatto con i dati validati
        $contact->update($validatedData);

        // Restituisci i dati aggiornati del contatto
        return response()->json(['message' => 'Contact updated successfully', 'contact' => $contact], 201);
    }

    public function destroy($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['error' => 'Contatto non trovato'], 404);
        }

        $contact->delete();

        return response()->json(['message' => 'Contatto eliminato con successo'], 200);
    }
}
