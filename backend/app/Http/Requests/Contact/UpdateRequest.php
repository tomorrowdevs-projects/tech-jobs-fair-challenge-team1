<?php

namespace App\Http\Requests\Contact;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:contacts',
            'phone_number' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'socials' => 'nullable|string',
            'country' => 'nullable|string',
            'region' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'zip_code' => 'nullable|string',
            'piva' => 'nullable|string',
            'vat' => 'nullable|string',
            'sdi' => 'nullable|string',
            'company_name' => 'nullable|string|max:255',
        ];
    }
}
