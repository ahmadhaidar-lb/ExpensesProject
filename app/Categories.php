<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    //
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function expenses()
    {
        return $this->hasMany('App\Expenses');
    }
    public function getTotalExpenses()
    {
        return $this->Expenses()->count();
    }
}
