<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $names = ['Marketing', 'IT', 'Designer', 'Business Developers', 'Account'];

        foreach($names as $value) {
            $new_department = new Department();
            $new_department->name = $value;
            $new_department->save();
        };

    }
}
