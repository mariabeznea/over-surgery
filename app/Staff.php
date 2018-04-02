<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $fillable = [
        //
    ];

//      In case plural version of Staff as table name doesnt work
   // protected $table = 'staff';

    public function user(){
        return $this->belongsTo("app\User");
    }

    public function staff_type(){
        return $this->belongsTo("app\Staff_type");
    }

    public function shifts()
    {
        return $this->hasMany("app\Shift");
    }

    public function appointments()
    {
        return $this->hasMany("app\Appointment");
    }
}

