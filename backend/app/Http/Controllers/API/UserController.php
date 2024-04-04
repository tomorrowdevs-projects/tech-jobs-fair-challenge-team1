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
}
