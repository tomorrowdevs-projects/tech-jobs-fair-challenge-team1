<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone_number',
        'category_id',
        'socials',
        'country',
        'region',
        'address',
        'city',
        'zip_code',
        'piva',
        'vat',
        'sdi',
        'company_name',
        'create_by_user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
