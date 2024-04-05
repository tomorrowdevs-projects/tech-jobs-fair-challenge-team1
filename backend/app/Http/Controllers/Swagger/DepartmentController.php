<?php

namespace App\Http\Controllers\Swagger;

use App\Http\Controllers\Controller;

/**
 * @OA\Post(
 *      path="/api/departments",
 *      summary="Crea un nuovo dipartimento",
 *      tags={"Departments"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  required={"name"},
 *                  @OA\Property(property="name", type="string", example="IT Designer Business Developers", description="Il nome del dipartimento",)
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
 *                  @OA\Property(property="name", type="string", example="IT Designer Business Developers", description="Il nome del dipartimento",),
 *                  @OA\Property(property="created_at", type="string", format="date-time", example="2024-04-04T20:35:29.000000Z", description="Data di creazione"),
 *                  @OA\Property(property="updated_at", type="string", format="date-time", example="2024-04-04T20:44:52.000000Z", description="Data di aggiornamento")           
 *              ),
 *          )
 *      ),
 * 
 *      @OA\Response(
 *          response=400,
 *          description="Richiesta non valida"
 *      )
 * ),
 * 
 * @OA\Get(
 *      path="/api/departments",
 *      summary="Restituisce una lista di dipartimenti",
 *      tags={"Departments"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="array", @OA\Items(
 *                  @OA\Property(property="id", type="integer", example="1"),
 *                  @OA\Property(property="name", type="string", example="IT", description="Il nome del dipartimento"),
 *                  @OA\Property(property="created_at", type="string", format="date-time", example="2024-04-04T20:35:29.000000Z", description="Data di creazione"),
 *                  @OA\Property(property="updated_at", type="string", format="date-time", example="2024-04-04T20:44:52.000000Z", description="Data di aggiornamento")  
 *              )),
 *          )
 *      ),
 * ),
 * 
 * @OA\Get(
 *      path="/api/departments/{department}",
 *      summary=" Restituisce un dipartimento specificato dall'ID",
 *      tags={"Departments"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Parameter(
 *          description="Dipartment ID",
 *          in="path",
 *          name="department",
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
 *                  @OA\Property(property="name", type="string", example="IT", description="Il nome del dipartimento"),
 *                  @OA\Property(property="created_at", type="string", format="date-time", example="2024-04-04T20:35:29.000000Z", description="Data di creazione"),
 *                  @OA\Property(property="updated_at", type="string", format="date-time", example="2024-04-04T20:44:52.000000Z", description="Data di aggiornamento")  
 *              ),
 *          )
 *      ),
 * 
 *      @OA\Response(
 *          response=404,
 *          description="Dipartimento non trovato",
 *      ),
 * ),
 * 
 * @OA\Put(
 *      path="/api/departments/{department}",
 *      summary="Aggiorna un dipartimento esistente",
 *      tags={"Departments"},
 *      security={{ "bearerAuth": {} }}, 
 *      @OA\Parameter(
 *          description="Dipartment ID",
 *          in="path",
 *          name="department",
 *          required=true,
 *          example=1
 *      ),
 * 
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  required={"name"},
 *                  @OA\Property(property="name", type="string", example="IT Designer Business Developers", description="Il nome del dipartimento",)
 *              )
 *          )
 *      ),
 * 
 *      @OA\Response(
 *          response=201,
 *          description="Modificato con successo",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="object",
 *                  @OA\Property(property="id", type="integer", example="1"),
 *                  @OA\Property(property="name", type="string", example="IT Designer Business Developers", description="Il nome del dipartimento",),
 *                  @OA\Property(property="created_at", type="string", format="date-time", example="2024-04-04T20:35:29.000000Z", description="Data di creazione"),
 *                  @OA\Property(property="updated_at", type="string", format="date-time", example="2024-04-04T20:44:52.000000Z", description="Data di aggiornamento")           
 *              ),
 *          )
 *      ),
 * 
 *      @OA\Response(
 *          response=400,
 *          description="Richiesta non valida",
 *      ),
 * 
 *      @OA\Response(
 *          response=404,
 *          description="Dipartimento non trovata",
 *      ),
 * ),
 *  
 * @OA\Delete(
 *      path="/api/departments/{department}",
 *      summary="Elimina un dipartimento esistente",
 *      tags={"Departments"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Parameter(
 *          description="Dipartment ID",
 *          in="path",
 *          name="department",
 *          required=true,
 *          example=1
 *      ), 
 * 
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Dipartimento eliminato con successo")
 *          )
 *      ),
 * 
 *      @OA\Response(
 *          response=404,
 *          description="Dipartimento non trovato",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Dipartimento non trovato")
 *          )
 *      ),
 * ),
 */
class DepartmentController extends Controller
{

}
