<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    public function staff(){
        return $this->belongsTo("app\Staff");
    }

    public function appointment(){
        return $this->belongsTo("app\Appointment");
    }

}
