<?php

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
    return $router->app->version();
});

$router->get('show', ['uses' => 'UserController@show']);

$router->post('add', ['uses' => 'UserController@add']);
$router->get('add', ['uses' => 'UserController@add']);
$router->get('abnormalReport', ['uses' => 'UserController@abnormalReport']);

$router->get('testMysql', ['uses' => 'UserController@testMysql']);
