<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Test_result extends Model
{
    public function patient()
    {
        return $this->belongsTo("app\Patient");
    }

    //Defining a dynamic scope to retrieve all test results related to a patient
    public function scopeOfPatient($query, $patient_id){
        return $query->where('patient_id', $patient_id);
    }
}
