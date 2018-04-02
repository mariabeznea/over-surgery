<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'first_name', 'last_name', 'address', 'phone_number', 'date_of_birth', 'user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function user(){
        return $this->belongsTo("app\User");
    }

    public function appointments()
    {
        return $this->hasMany("app\Appointment");
    }

    public function prescriptions()
    {
        return $this->hasMany("app\Prescription");
    }
}
