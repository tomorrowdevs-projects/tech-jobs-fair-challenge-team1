<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Faker\Generator as Faker;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Faker $faker): void
    {

        // Inserimento di 10 utenti casuali
        for ($i = 0; $i < 10; $i++) {
            $new_user = new User();
            $new_user->role = $faker->randomElement(['basic', 'maintainer', 'admin', 'super-admin']);
            $new_user->name = $faker->firstName();
            $new_user->surname = $faker->lastName();
            $new_user->email = $faker->unique()->safeEmail();
            $new_user->password = Hash::make('admin123');
            $new_user->phoneNumber = $faker->phoneNumber();
            $new_user->save();
        }

        // Utente admin predefinito
        $user = new User();
        $user->role = 'super-admin';
        $user->name = 'admin';
        $user->surname = 'admin';
        $user->email = 'admin@admin.com';
        $user->password = Hash::make('admin123');
        $user->save();

    }
}
