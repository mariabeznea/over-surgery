<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prescription_status extends Model
{
    public $timestamps = false;

    public function prescriptions()
    {
        return $this->hasMany("app\Prescription");
    }
}
