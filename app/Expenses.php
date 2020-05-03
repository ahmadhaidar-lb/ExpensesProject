<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    //
    public function user() {
        return $this->belongsTo('App\User');
    }

    public function Category() {
        return $this->belongsTo('App\Categories');
    }
}
