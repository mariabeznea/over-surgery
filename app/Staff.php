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

    public function prescriptions()
    {
        return $this->hasMany("app\Prescription");
    }

    public function chat_messages()
    {
        return $this->hasMany("app\Chat_message");
    }
}

