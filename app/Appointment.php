<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    public function patient(){
        return $this->belongsTo("app\Patient");
    }

    public function staff(){
        return $this->belongsTo("app\Staff");
    }

    public function shift()
    {
        return $this->hasOne("app\Shift");
    }
}
