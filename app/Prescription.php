<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    public function patient()
    {
        return $this->belongsTo("app\Patient");
    }

    public function staff()
    {
        return $this->belongsTo("app\Staff");
    }

    public function medicine()
    {
        return $this->hasOne("app\Medicine");
    }

    public function prescription_status()
    {
        return $this->hasOne("app\Prescription_status");
    }

    //Defining a dynamic scope to retrieve all prescriptions related to a patient
    public function scopeOfPatient($query, $patient_id){
        return $query->where('patient_id', $patient_id);

    }
}
