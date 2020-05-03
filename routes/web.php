<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
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
Route::get('demos/react-pagination','DemoController@viewReactPagination');
Route::post('demos/react-pagination','DemoController@getReactPagination');
//Route::view('/{path?}', 'home');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/categories','CategoriesController@getAll');
Route::get('/categories/{month}','CategoriesController@getAllByMonth');
Route::post('/categories/delete/{id}','CategoriesController@delete');
Route::post('/categories/add','CategoriesController@create');
Route::post('/categories/edit/{id}','CategoriesController@update');
Route::get('/expenses','ExpensesController@getAll');
Route::get('/expenses/{id}','ExpensesController@get');
Route::post('/expenses/delete/{id}','ExpensesController@delete');
Route::post('/expenses/add','ExpensesController@create');
Route::post('/expenses/edit/{id}','ExpensesController@update');
Route::get('/expensesByCategory/{id}','ExpensesController@getAllByCategory');
Route::get('/expensesByCategoryAndMonth/{month}/{id}','ExpensesController@getAllByCategoryAndMonth');
