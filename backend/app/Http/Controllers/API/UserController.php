<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User; // Assicurati di importare il modello User

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
}
