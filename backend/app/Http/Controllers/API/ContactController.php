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
}
