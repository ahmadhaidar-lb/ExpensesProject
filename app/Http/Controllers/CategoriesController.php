<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Expenses;
use App\User;
use App\Categories;
class CategoriesController extends Controller
{
    //
    public function create(REQUEST $request)
    {
       $data=json_decode($request->getContent());
       $category=new Categories();
      
       $category->name=$data->title;
       $category->user_id=Auth::id();
       $category->save();
      
      
    }
    public function getAll()
    {
       
        $categories=Categories::where('user_id',Auth::id())->orderBy('created_at','desc')->get();

        foreach($categories as $category)
        {
            
            
            $category->counter=$category->getTotalExpenses();
        }
       echo json_encode($categories);
       
    }
    public function getAllByMonth($month)
    {
       
        $categories=Categories::where('user_id',Auth::id())->orderBy('created_at','desc')->get();

        foreach($categories as $category)
        {
            
            
            $category->counter= Expenses::where('user_id', Auth::id())
            ->whereMonth('due_date',$month)->where('categories_id',$category->id)->count();
        }
       echo json_encode($categories);
       
    }
    public function getCategory($id)
    {
        $category=Categories::where('id', $id)->first();
        $category->username=Categories::find($category->id)->user->name;
        $category->counter=$category->getTotalExpenses();
        return $category;
    }
    public function update(REQUEST $request,$id)
    {
       
       $data=json_decode($request->getContent());
       $category=Categories::where('id', $id)->first();
       $category->name=$data->title;
       $category->user_id=Auth::id();
       $category->save();
    }
    public function delete(REQUEST $request)
    {
        $data=json_decode($request->getContent());
        Categories::where('id',$data->id)->first()->delete();
    }
}
