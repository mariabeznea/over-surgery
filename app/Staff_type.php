<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff_type extends Model
{
    public $timestamps = false;

    public function staff()
    {
        return $this->hasMany("app\Staff");
    }
}
