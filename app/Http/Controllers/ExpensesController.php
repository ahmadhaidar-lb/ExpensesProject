<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use DB;
use App\Expenses;
use App\User;
use App\Categories;
use Illuminate\Http\Request;

class ExpensesController extends Controller
{
    //
    public function create(REQUEST $request)
    {
        $data = json_decode($request->getContent());
        $expense = new Expenses();
        $expense->amount = $data->amount;
        $expense->title = $data->title;
        $expense->due_date = $data->due_date;
        $expense->categories_id = $data->category_name;
        $expense->user_id = Auth::id();
        $expense->save();
    }
    public function getAll()
    {
       
        $expenses = Expenses::where('user_id', Auth::id())->orderBy('created_at', 'desc')->get();
        foreach($expenses as $expense)
        {
            
            $category= Categories::where('id',$expense->categories_id)->orderBy('created_at','desc')->get('name')->first();
           
            $expense->category_name=$category->name;
        }
      
        echo json_encode($expenses);
    }
    public function getAllByCategory($category_id)
    {
       
        $expenses = Expenses::where('user_id', Auth::id())->where('categories_id',$category_id)->orderBy('created_at', 'desc')->paginate(4);;
        foreach($expenses as $expense)
        {
            
            $category= Categories::where('id',$expense->categories_id)->orderBy('created_at','desc')->get('name')->first();
           
            $expense->category_name=$category->name;
        }
      
        echo json_encode($expenses);
    }
    public function getAllByCategoryAndMonth($month,$category_id)
    {
       
        $expenses = Expenses::where('user_id', Auth::id())->whereMonth('due_date',$month)->where('categories_id',$category_id)->orderBy('created_at', 'desc')->paginate(4);
        foreach($expenses as $expense)
        {
            
            $category= Categories::where('id',$expense->categories_id)->orderBy('created_at','desc')->get('name')->first();
           
            $expense->category_name=$category->name;
        }
      
        echo json_encode($expenses);
    }
    public function get($id)
    {
       
        $expenses = Expenses::where('user_id', Auth::id())->where('id',$id)->get();
        foreach($expenses as $expense)
        {
            
            $category= Categories::where('id',$expense->categories_id)->orderBy('created_at','desc')->get('name')->first();
           
            $expense->category_name=$category->name;
        }
      
        echo json_encode($expenses);
    }
    public function update(REQUEST $request)
    {

        $data = json_decode($request->getContent());
        $expense = Expenses::where('id', $data->id)->first();
        $expense->title = $data->title;
        $expense->due_date = $data->due_date;
        $expense->amount = $data->amount;
        $expense->categories_id = $data->category_id;
        $expense->user_id = Auth::id();
        $expense->save();
    }
    public function delete(REQUEST $request)
    {
        $data = json_decode($request->getContent());
        Expenses::where('id', $data->id)->first()->delete();
    }
}
