<?php

namespace App\Http\Controllers\Swagger;

use App\Http\Controllers\Controller;

/**
 * @OA\Post(
 *      path="/api/users",
 *      summary="Crea un nuovo utente",
 *      tags={"User"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  required={"name", "surname", "email", "password", "role"},
 *                  @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente",),
 *                  @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                  @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                  @OA\Property(property="password", type="string", example="password", description="La password dell'utente"),
 *                  @OA\Property(property="phoneNumber", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                  @OA\Property(property="role", type="string", example="basic", description="Il ruolo dell'utente"),
 *              )
 *          )
 *      ),
 *      
 *      @OA\Response(
 *          response=201,
 *          description="Creato con successo",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="object",
 *                  @OA\Property(property="id", type="integer", example="1"),
 *                  @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                  @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                  @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                  @OA\Property(property="password", type="string", example="password", description="La password dell'utente"),
 *                  @OA\Property(property="phoneNumber", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                  @OA\Property(property="role", type="string", example="basic", description="Il ruolo dell'utente"),
 *              ),
 *          )
 *      ),
 *      @OA\Response(
 *          response=400,
 *          description="Richiesta non valida"
 *      )
 * ),
 * 
 * @OA\Get(
 *      path="/api/users",
 *      summary="Restituisce una lista di utenti",
 *      tags={"User"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="array", @OA\Items(
 *                  @OA\Property(property="id", type="integer", example="1"),
 *                  @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                  @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                  @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                  @OA\Property(property="password", type="string", example="password", description="La password dell'utente"),
 *                  @OA\Property(property="phoneNumber", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                  @OA\Property(property="role", type="string", example="basic", description="Il ruolo dell'utente"),
 *              )),
 *          )
 *      ),
 * ),
 * 
 * @OA\Get(
 *      path="/api/users/{user}",
 *      summary=" Restituisce un utente specificato dall'ID",
 *      tags={"User"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Parameter(
 *          description="User ID",
 *          in="path",
 *          name="user",
 *          required=true,
 *          example=1
 *      ), 
 * 
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="object",
 *                  @OA\Property(property="id", type="integer", example="1"),
 *                  @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                  @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                  @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                  @OA\Property(property="password", type="string", example="password", description="La password dell'utente"),
 *                  @OA\Property(property="phoneNumber", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                  @OA\Property(property="role", type="string", example="basic", description="Il ruolo dell'utente"),
 *              ),
 *          )
 *      ),
 * ),
 * 
 * @OA\Put(
 *      path="/api/users/{user}",
 *      summary="Aggiorna un utente esistente",
 *      tags={"User"},
 *      security={{ "bearerAuth": {} }}, 
 *      @OA\Parameter(
 *          description="User ID",
 *          in="path",
 *          name="user",
 *          required=true,
 *          example=1
 *      ),
 * 
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  required={"name", "surname", "email", "password", "role"},
 *                  @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                  @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                  @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                  @OA\Property(property="password", type="string", example="password", description="La password dell'utente"),
 *                  @OA\Property(property="phoneNumber", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                  @OA\Property(property="role", type="string", example="super-admin", description="Il ruolo dell'utente"),
 *              )
 *          )
 *      ), 
 * 
 *      @OA\Response(
 *          response=201,
 *          description="Salvato",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="object",
 *                  @OA\Property(property="id", type="integer", example="1"),
 *                  @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                  @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                  @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                  @OA\Property(property="password", type="string", example="password", description="La password dell'utente"),
 *                  @OA\Property(property="phoneNumber", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                  @OA\Property(property="role", type="string", example="basic", description="Il ruolo dell'utente"),
 *              ),
 *          )
 *      ),
 * ),
 * 
 * @OA\Delete(
 *      path="/api/users/{user}",
 *      summary="Elimina un utente esistente",
 *      tags={"User"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Parameter(
 *          description="User ID",
 *          in="path",
 *          name="user",
 *          required=true,
 *          example=1
 *      ), 
 * 
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Utente eliminato con successo")
 *          )
 *      ),
 * ),
 */
class UserController extends Controller
{
}
