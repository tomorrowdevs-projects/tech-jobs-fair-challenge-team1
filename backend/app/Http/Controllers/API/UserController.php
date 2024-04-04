<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User; // Assicurati di importare il modello User
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function index()
    {
        // Recupera tutti gli utenti dal database
        $users = User::all();

        // Restituisci gli utenti come risposta JSON
        return response()->json(['users' => $users]);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['user' => $user], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json(['user' => $user], 201);
    }

    public function update(Request $request, $id)
    {

        // Trova l'utente da aggiornare
        $user = User::find($id);

        // Se l'utente non esiste, restituisci un messaggio di errore
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Validazione dei dati inviati
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'surname' => 'string|max:255',
            'email' => 'email|max:255|unique:users,email,' . $id,
            'password' => 'string|min:8',
            'role' => 'string|max:255',
        ]);

        // Aggiorna le informazioni dell'utente con i dati validati
        $user->update($validatedData);

        // Restituisci i dati aggiornati dell'utente
        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Utente non trovato'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Utente eliminato con successo'], 200);
    }
}
