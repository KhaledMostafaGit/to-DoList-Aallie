<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
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


Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');

Route::post('/tasks',[TaskController::class,'store'])->name('tasks.store');

Route::put('/tasks/{id}',[TaskController::class,'update'])->name('tasks.update');

Route::delete('/tasks/{id}',[TaskController::class,'delete'])->name('tasks.delete');