<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use App\Http\Controllers\UserController;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');
Route::options('/{any:.*}', [function (){ 
   return response(['status' => 'success']); 
  }
 ]
);

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    //return $router->app->version();
    echo('Hey this is lumen');
});

$router->post('register','UserController@register');
$router->post('/login', 'UserController@login');
$router->get('/getUserFullName','UserController@getUserFullName');
$router->post('/store', 'ForumController@store');
$router->get('/showall','ForumController@showAll');
$router->post('/pledge', 'PledgeController@pledge');
$router->get('/getCount', 'PledgeController@getCount');
$router->get('/blogs','BlogController@blog');
$router->get('/blogs/{id}','BlogController@show');