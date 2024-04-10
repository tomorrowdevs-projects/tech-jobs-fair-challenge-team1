<?php

namespace App\Http\Controllers\Swagger;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * @OA\Post(
 *      path="/api/auth/login",
 *      summary="Effettua il login",
 *      tags={"Auth"},
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  required={"email", "password"},
 *                  @OA\Property(property="email", type="string", format="email", example="user@example.com", description="Email dell'utente"),
 *                  @OA\Property(property="password", type="string", example="password", description="Password dell'utente"),
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Login effettuato con successo",
 *          @OA\JsonContent(
 *              @OA\Property(property="access_token", type="string", example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", description="Token di accesso JWT"),
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Credenziali non valide"
 *      )
 * ),
 * @OA\Post(
 *      path="/api/auth/logout",
 *      summary="Effettua il logout",
 *      tags={"Auth"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Response(
 *          response=200,
 *          description="Logout effettuato con successo",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Logout effettuato con successo"),
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Non autorizzato"
 *      )
 * )
 */
class AuthController extends Controller
{
}
