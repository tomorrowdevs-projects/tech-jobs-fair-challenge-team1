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
Route::resource('contacts', ContactController::class)->middleware('jwt.auth');
Route::resource('categories', CategoryController::class)->middleware('jwt.auth');
Route::resource('departments', DepartmentController::class)->middleware('jwt.auth');

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout',  [LoginController::class, 'logout']);
