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
}
