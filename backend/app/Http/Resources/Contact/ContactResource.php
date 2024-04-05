<?php

namespace App\Http\Resources\Contact;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'surname' => $this->surname,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'category_id' => $this->category_id,
            'socials' => $this->socials,
            'country' => $this->country,
            'region' => $this->region,
            'address' => $this->address,
            'city' => $this->city,
            'zip_code' => $this->zip_code,
            'piva' => $this->piva,
            'vat' => $this->vat,
            'sdi' => $this->sdi,
            'company_name' => $this->company_name
        ];
    }
}
