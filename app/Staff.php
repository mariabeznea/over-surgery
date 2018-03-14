<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $fillable = [
        //
    ];

    public function user(){
        return $this->belongsTo("app\User");
    }
}
