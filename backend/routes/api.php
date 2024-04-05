<?php

use App\Http\Controllers\API\CategoriesController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\DepartmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

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


Route::resource('users', UserController::class)->middleware('jwt.auth');


Route::get('/contacts', [ContactController::class, 'index'])->middleware('jwt.auth');;
Route::get('/contacts/{id}', [ContactController::class, 'show'])->middleware('jwt.auth');;
Route::post('/contacts', [ContactController::class, 'store'])->middleware('jwt.auth');;
Route::put('/contacts/{id}', [ContactController::class, 'update'])->middleware('jwt.auth');;
Route::delete('/contacts/{id}', [ContactController::class, 'destroy'])->middleware('jwt.auth');;

Route::get('/category/all', [CategoriesController::class, 'all']);
Route::post('/category', [CategoriesController::class, 'create']);
Route::delete('/category/{id}', [CategoriesController::class, 'delete']);

Route::get('/department/all', [DepartmentController::class, 'all']);
Route::post('/department', [DepartmentController::class, 'create']);
Route::delete('/department/{id}', [DepartmentController::class, 'delete']);

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout',  [LoginController::class, 'logout']);
