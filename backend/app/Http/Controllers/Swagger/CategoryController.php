<?php

namespace App\Http\Controllers\Swagger;

use App\Http\Controllers\Controller;

/**
 * @OA\Post(
 *      path="/api/categories",
 *      summary="Crea una nuova categoria",
 *      tags={"Categories"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  required={"name"},
 *                  @OA\Property(property="name", type="string", example="Customer Employers Partners", description="Il nome della categoria",)
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
 *                  @OA\Property(property="name", type="string", example="Customer Employers Partners", description="Il nome della categoria",),
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
 *      path="/api/categories",
 *      summary="Restituisce una lista di categorie",
 *      tags={"Categories"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="array", @OA\Items(
 *                  @OA\Property(property="id", type="integer", example="1"),
 *                  @OA\Property(property="name", type="string", example="Customer", description="Il nome della categoria"),
 *                  @OA\Property(property="created_at", type="string", format="date-time", example="2024-04-04T20:35:29.000000Z", description="Data di creazione"),
 *                  @OA\Property(property="updated_at", type="string", format="date-time", example="2024-04-04T20:44:52.000000Z", description="Data di aggiornamento")  
 *              )),
 *          )
 *      ),
 * ),
 * 
 * @OA\Get(
 *      path="/api/categories/{category}",
 *      summary=" Restituisce una categoria specificato dall'ID",
 *      tags={"Categories"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Parameter(
 *          description="Category ID",
 *          in="path",
 *          name="category",
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
 *                  @OA\Property(property="name", type="string", example="Customer", description="Il nome della categoria"),
 *                  @OA\Property(property="created_at", type="string", format="date-time", example="2024-04-04T20:35:29.000000Z", description="Data di creazione"),
 *                  @OA\Property(property="updated_at", type="string", format="date-time", example="2024-04-04T20:44:52.000000Z", description="Data di aggiornamento")  
 *              ),
 *          )
 *      ),
 * 
 *      @OA\Response(
 *          response=404,
 *          description="Categoria non trovato",
 *      ),
 * ),
 * 
 * @OA\Put(
 *      path="/api/categories/{category}",
 *      summary="Aggiorna una categoria esistente",
 *      tags={"Categories"},
 *      security={{ "bearerAuth": {} }}, 
 *      @OA\Parameter(
 *          description="Category ID",
 *          in="path",
 *          name="category",
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
 *                  @OA\Property(property="name", type="string", example="Customer Employers Partners", description="Il nome della categoria",)
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
 *                  @OA\Property(property="name", type="string", example="Customer Employers Partners", description="Il nome della categoria",),
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
 *          description="Categoria non trovata",
 *      ),
 * ),
 *  
 * @OA\Delete(
 *      path="/api/categories/{category}",
 *      summary="Elimina una categoria esistente",
 *      tags={"Categories"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Parameter(
 *          description="Category ID",
 *          in="path",
 *          name="category",
 *          required=true,
 *          example=1
 *      ), 
 * 
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Categoria eliminata con successo")
 *          )
 *      ),
 * 
 *      @OA\Response(
 *          response=404,
 *          description="Categoria non trovata",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Contatto non trovato")
 *          )
 *      ),
 * ),
 */
class CategoryController extends Controller
{
}
