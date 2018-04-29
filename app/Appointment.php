<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'date', 'start_hours', 'end_hours', 'location', 'notes', 'staff_id', 'patient_id'
    ];

    public function patient()
    {
        return $this->belongsTo("App\Patient");
    }

    public function staff()
    {
        return $this->belongsTo("app\Staff");
    }

    public function shift()
    {
        return $this->hasOne("app\Shift");
    }

    //Defining a dynamic scope to retrieve all appointments related to a patient
    public function scopeOfPatient($query, $patient_id){
        return $query->where('patient_id', $patient_id);

    }
}
