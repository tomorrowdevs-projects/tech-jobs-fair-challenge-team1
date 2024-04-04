<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = ['Customer','Parthners', 'Employers'];

        foreach($names as $value) {
            $new_category = new Category();
            $new_category->name = $value;
            $new_category->save();
        };
    }
}
