<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'first_name', 'last_name', 'address', 'phone_number', 'date_of_birth', 'user_id'
    ];

    public function user(){
        return $this->belongsTo("app\User");
    }
}
