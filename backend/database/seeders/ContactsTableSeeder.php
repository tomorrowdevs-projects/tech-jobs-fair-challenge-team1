<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class ContactsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Faker $faker): void
    {
        // Recupera tutti gli ID degli utenti dal database
        $userIds = User::pluck('id')->toArray();

        foreach (range(1, 50) as $index) {
            $new_contact = new Contact();
            $new_contact->name = $faker->firstName;
            $new_contact->surname = $faker->lastName;
            $new_contact->email = $faker->unique()->safeEmail;
            $new_contact->phone_number = $faker->phoneNumber;
            $new_contact->category_id = $faker->numberBetween(1, 3);
            $new_contact->socials = $faker->optional()->url;
            $new_contact->country = $faker->country;
            $new_contact->region = $faker->state;
            $new_contact->address = $faker->streetAddress;
            $new_contact->city = $faker->city;
            $new_contact->zip_code = $faker->postcode;
            $new_contact->piva = $faker->optional()->numerify('#############');
            $new_contact->vat = $faker->optional()->numerify('IT###########');
            $new_contact->sdi = $faker->optional()->numerify('##########');
            $new_contact->company_name = $faker->company;
            $new_contact->create_by_user_id = $faker->randomElement($userIds);
            $new_contact->created_at = now();
            $new_contact->updated_at = now();
            $new_contact->save();
        }
    }
}
