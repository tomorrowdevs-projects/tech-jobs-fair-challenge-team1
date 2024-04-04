<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = JWTAuth::attempt($credentials)) {
            $user = JWTAuth::user(); // Ottieni l'utente associato al token
            return response()->json(['token' => $token, 'user' => $user], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function logout()
    {
        $token = JWTAuth::getToken();
        
        if ($token) {
            JWTAuth::invalidate($token);
        }

        return response()->json(['message' => 'Successfully logged out'], 200);
    }
}
