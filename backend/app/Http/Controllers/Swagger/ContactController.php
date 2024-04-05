<?php

namespace App\Http\Controllers\Swagger;

use App\Http\Controllers\Controller;


/**
 * @OA\Post(
 *      path="/api/contacts",
 *      summary="Crea un nuovo contatto",
 *      tags={"Contact"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\RequestBody(
 *          required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 required={"name", "surname", "email", "phone_number", "category_id"},
 *                 @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                 @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                 @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                 @OA\Property(property="phone_number", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                 @OA\Property(property="category_id", type="integer", example="1", description="ID di categoria"),
 *                 @OA\Property(property="departments", type="array", @OA\Items(type="integer"), example={"1", "2"}, description="ID del dipartimento"),
 *                 @OA\Property(property="socials", type="string", example="Facebook", description="Elenco dei social"),
 *                 @OA\Property(property="country", type="string", example="Italy", description="Paese"),
 *                 @OA\Property(property="region", type="string", example="Lazio", description="Regione"),
 *                 @OA\Property(property="address", type="string", example="Via Roma 123", description="Indirizzo"),
 *                 @OA\Property(property="city", type="string", example="Roma", description="Città"),
 *                 @OA\Property(property="zipcode", type="string", example="00100", description="CAP"),
 *                 @OA\Property(property="vat", type="string", example="IT12345678901", description="Partita IVA"),
 *                 @OA\Property(property="companyName", type="string", example="My Company", description="Nome dell'azienda"),
 *                 @OA\Property(property="SDI", type="string", example="ABC123", description="Codice SDI"),
 *                 @OA\Property(property="company_name", type="string", example="Gottlieb Ltd", description="Il ruolo dell'utente")
 *             )
 *         )
 *      ),
 * 
 *      @OA\Response(
 *          response=201,
 *          description="Creato con successo",
 *      ),
 * 
 *      @OA\Response(
 *          response=400,
 *          description="Richiesta non valida",
 *      ),   
 * ),
 * 
 * @OA\Get(
 *      path="/api/contacts",
 *      summary="Restituisce una lista di contati",
 *      tags={"Contact"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="array", @OA\Items(
 *                 @OA\Property(property="id", type="integer", example="1"),
 *                 @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                 @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                 @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                 @OA\Property(property="phone_number", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                 @OA\Property(property="category_id", type="integer", example="1", description="ID di categoria"),
 *                 @OA\Property(property="departments", type="array", @OA\Items(type="object",
 *                      @OA\Property(property="id", type="integer", example="1", description="ID del dipartimento"),
 *                      @OA\Property(property="name", type="string", example="Marketing", description="Nome del dipartimento")
 *                 ), description="Array degli oggetti che rappresentano i dipartimenti"),
 *                 @OA\Property(property="socials", type="string", example="Facebook", description="Elenco dei social"),
 *                 @OA\Property(property="country", type="string", example="Italy", description="Paese"),
 *                 @OA\Property(property="region", type="string", example="Lazio", description="Regione"),
 *                 @OA\Property(property="address", type="string", example="Via Roma 123", description="Indirizzo"),
 *                 @OA\Property(property="city", type="string", example="Roma", description="Città"),
 *                 @OA\Property(property="zipcode", type="string", example="00100", description="CAP"),
 *                 @OA\Property(property="vat", type="string", example="IT12345678901", description="Partita IVA"),
 *                 @OA\Property(property="companyName", type="string", example="My Company", description="Nome dell'azienda"),
 *                 @OA\Property(property="SDI", type="string", example="ABC123", description="Codice SDI"),
 *                 @OA\Property(property="company_name", type="string", example="Gottlieb Ltd", description="Il ruolo dell'utente"),
 *                 @OA\Property(property="created_at", type="string", format="date-time", example="2024-04-04T20:35:29.000000Z", description="Data di creazione"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-04-04T20:44:52.000000Z", description="Data di aggiornamento")
 *              )),
 *          )
 *      ),
 * ),
 * 
 * @OA\Get(
 *      path="/api/contacts/{contact}",
 *      summary=" Restituisce un contatto specificato dall'ID",
 *      tags={"Contact"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Parameter(
 *          description="Contact ID",
 *          in="path",
 *          name="contact",
 *          required=true,
 *          example=1
 *      ), 
 * 
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="object",
 *                 @OA\Property(property="id", type="integer", example="1"),
 *                 @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                 @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                 @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                 @OA\Property(property="phone_number", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                 @OA\Property(property="category_id", type="integer", example="1", description="ID di categoria"),
 *                 @OA\Property(property="departments", type="array", @OA\Items(type="object",
 *                      @OA\Property(property="id", type="integer", example="1", description="ID del dipartimento"),
 *                      @OA\Property(property="name", type="string", example="Marketing", description="Nome del dipartimento")
 *                 ), description="Array degli oggetti che rappresentano i dipartimenti"),
 *                 @OA\Property(property="socials", type="string", example="Facebook", description="Elenco dei social"),
 *                 @OA\Property(property="country", type="string", example="Italy", description="Paese"),
 *                 @OA\Property(property="region", type="string", example="Lazio", description="Regione"),
 *                 @OA\Property(property="address", type="string", example="Via Roma 123", description="Indirizzo"),
 *                 @OA\Property(property="city", type="string", example="Roma", description="Città"),
 *                 @OA\Property(property="zipcode", type="string", example="00100", description="CAP"),
 *                 @OA\Property(property="vat", type="string", example="IT12345678901", description="Partita IVA"),
 *                 @OA\Property(property="companyName", type="string", example="My Company", description="Nome dell'azienda"),
 *                 @OA\Property(property="SDI", type="string", example="ABC123", description="Codice SDI"),
 *                 @OA\Property(property="company_name", type="string", example="Gottlieb Ltd", description="Il ruolo dell'utente"),
 *                 @OA\Property(property="created_at", type="string", format="date-time", example="2024-04-04T20:35:29.000000Z", description="Data di creazione"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-04-04T20:44:52.000000Z", description="Data di aggiornamento")
 *              ),
 *          )
 *      ),
 * ),
 * 
 * @OA\Put(
 *      path="/api/contacts/{contact}",
 *      summary="Aggiorna un contatto esistente",
 *      tags={"Contact"},
 *      security={{ "bearerAuth": {} }}, 
 *      @OA\Parameter(
 *          description="Contact ID",
 *          in="path",
 *          name="contact",
 *          required=true,
 *          example=1
 *      ),
 * 
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  required={"name", "surname", "email", "phone_number", "category_id"},
 *                  @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                  @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                  @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                  @OA\Property(property="phone_number", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                  @OA\Property(property="category_id", type="integer", example="1", description="ID di categoria"),
 *                  @OA\Property(property="departments", type="array", @OA\Items(type="integer"), example={"1", "2"}, description="ID del dipartimento"),
 *                  @OA\Property(property="socials", type="string", example="Facebook", description="Elenco dei social"),
 *                  @OA\Property(property="country", type="string", example="Italy", description="Paese"),
 *                  @OA\Property(property="region", type="string", example="Lazio", description="Regione"),
 *                  @OA\Property(property="address", type="string", example="Via Roma 123", description="Indirizzo"),
 *                  @OA\Property(property="city", type="string", example="Roma", description="Città"),
 *                  @OA\Property(property="zipcode", type="string", example="00100", description="CAP"),
 *                  @OA\Property(property="vat", type="string", example="IT12345678901", description="Partita IVA"),
 *                  @OA\Property(property="companyName", type="string", example="My Company", description="Nome dell'azienda"),
 *                  @OA\Property(property="SDI", type="string", example="ABC123", description="Codice SDI"),
 *                  @OA\Property(property="company_name", type="string", example="Gottlieb Ltd", description="Il ruolo dell'utente")
 *              )
 *          )
 *      ), 
 * 
 *      @OA\Response(
 *          response=201,
 *          description="Salvato",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="object",
 *                 @OA\Property(property="id", type="integer", example="1"),
 *                 @OA\Property(property="name", type="string", example="Mario", description="Il nome dell'utente"),
 *                 @OA\Property(property="surname", type="string", example="Rossi", description="Il cognome dell'utente"),
 *                 @OA\Property(property="email", type="string", format="email", example="mycompany@gmail.com", description="La email dell'utente"),
 *                 @OA\Property(property="phone_number", type="string", example="+390001112233", description="Il numero di telefono dell'utente"),
 *                 @OA\Property(property="category_id", type="integer", example="1", description="ID di categoria"),
 *                 @OA\Property(property="departments", type="array", @OA\Items(type="object",
 *                      @OA\Property(property="id", type="integer", example="1", description="ID del dipartimento"),
 *                      @OA\Property(property="name", type="string", example="Marketing", description="Nome del dipartimento")
 *                 ), description="Array degli oggetti che rappresentano i dipartimenti"),
 *                 @OA\Property(property="socials", type="string", example="Facebook", description="Elenco dei social"),
 *                 @OA\Property(property="country", type="string", example="Italy", description="Paese"),
 *                 @OA\Property(property="region", type="string", example="Lazio", description="Regione"),
 *                 @OA\Property(property="address", type="string", example="Via Roma 123", description="Indirizzo"),
 *                 @OA\Property(property="city", type="string", example="Roma", description="Città"),
 *                 @OA\Property(property="zipcode", type="string", example="00100", description="CAP"),
 *                 @OA\Property(property="vat", type="string", example="IT12345678901", description="Partita IVA"),
 *                 @OA\Property(property="companyName", type="string", example="My Company", description="Nome dell'azienda"),
 *                 @OA\Property(property="SDI", type="string", example="ABC123", description="Codice SDI"),
 *                 @OA\Property(property="company_name", type="string", example="Gottlieb Ltd", description="Il ruolo dell'utente"),
 *                 @OA\Property(property="created_at", type="string", format="date-time", example="2024-04-04T20:35:29.000000Z", description="Data di creazione"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-04-04T20:44:52.000000Z", description="Data di aggiornamento")
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
 *      path="/api/contacts/{contact}",
 *      summary="Elimina un contatto esistente",
 *      tags={"Contact"},
 *      security={{ "bearerAuth": {} }},
 *      @OA\Parameter(
 *          description="Contact ID",
 *          in="path",
 *          name="contact",
 *          required=true,
 *          example=1
 *      ), 
 * 
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Contatto eliminato con successo")
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
class ContactController extends Controller
{
 
}
