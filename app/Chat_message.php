<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat_message extends Model
{
    protected $fillable = [
        'owner', 'message', 'patient_id', 'staff_id'
    ];

    public function patient()
    {
        return $this->belongsTo("app\Patient");
    }

    public function staff()
    {
        return $this->belongsTo("app\Staff");
    }

    //Defining a dynamic scope to retrieve all appointments related to a patient
    public function scopeOfPatient($query, $patient_id){
        return $query->where('patient_id', $patient_id);

    }
}
