<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Contact\ContactResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'role' => $this->role,
            'phone_number' => $this->phone_number,
            'contacts' => ContactResource::collection($this->whenLoaded('contacts')),
        ];
    }
}
