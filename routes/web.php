<?php
use App\Conversation;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::prefix('/socket')->group(function () {
    Route::post('/auth', function () {
        Redis::publish('authentication', json_encode([
            'action' => 'auth',
            'socketId' => request()->socketId,
            'userId' => auth()->id(),
            'message' => 'authenticated',
            'conversation' => request('converstation') ?? Conversation::create([])->id
        ]));
    });
});
