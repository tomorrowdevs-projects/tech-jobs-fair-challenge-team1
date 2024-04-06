<?php

use App\Http\Controllers\API\CategoriesController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\DepartmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);

});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Route group per gestire User
Route::middleware(['jwt.auth'])->group(function () {
    Route::resource('users', UserController::class)->middleware('can:viewAny,App\Models\User');
    
    // Utilizza UserPolicy per gestire le autorizzazioni su singole azioni
    Route::post('users', [UserController::class, 'register'])->middleware('can:create,App\Models\User');
    Route::put('users/{user}', [UserController::class, 'update'])->middleware('can:update,user');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->middleware('can:delete,user');
});

// Route group per gestire Contact
Route::middleware(['jwt.auth'])->group(function () {
    Route::resource('contacts', ContactController::class)->middleware('can:viewAny,App\Models\Contact');
    
    // Utilizza ContactPolicy per gestire le autorizzazioni su singole azioni
    Route::post('contacts', [ContactController::class, 'store'])->middleware('can:create,App\Models\Contact');
    Route::put('contacts/{contact}', [ContactController::class, 'update'])->middleware('can:update,contact');
    Route::delete('contacts/{contact}', [ContactController::class, 'destroy'])->middleware('can:delete,contact');
});

// Route group per gestire Category
Route::middleware(['jwt.auth'])->group(function () {
    Route::resource('categories', CategoryController::class)->middleware('can:viewAny,App\Models\Category');
    
    // Utilizza CategoryPolicy per gestire le autorizzazioni su singole azioni
    Route::post('categories', [CategoryController::class, 'store'])->middleware('can:create,App\Models\Category');
    Route::put('categories/{category}', [CategoryController::class, 'update'])->middleware('can:update,category');
    Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->middleware('can:delete,category');
});

// Route group per gestire Department
Route::middleware(['jwt.auth'])->group(function () {
    Route::resource('departments', DepartmentController::class)->middleware('can:viewAny,App\Models\Department');
    
    // Utilizza DepartmentPolicy per gestire le autorizzazioni su singole azioni
    Route::post('departments', [DepartmentController::class, 'store'])->middleware('can:create,App\Models\Department');
    Route::put('departments/{department}', [DepartmentController::class, 'update'])->middleware('can:update,department');
    Route::delete('departments/{department}', [DepartmentController::class, 'destroy'])->middleware('can:delete,department');
});