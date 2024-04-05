<?php

namespace App\Http\Controllers\Swagger;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * @OA\Info(
 *      title="My Doc API",
 *      version="1.0.0",
 *      description="Descrizione dell'API"
 * )
 * @OA\PathItem(
 *      path="/api/"
 * )
 * 
 * @OA\Components(
 *      @OA\SecurityScheme(
 *          securityScheme="bearerAuth",
 *          type="http",
 *          scheme="bearer",
 *      )
 * )
 */
class MainController extends Controller
{
    //
}
