<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Contact;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{

    public function all()
    {
        $categories = Category::all();

        return response()->json(['categories' => $categories], 200);
    }

    public function create(Request $request)
    {

        $category = Category::create([
            'name' => $request->name
        ]);
        return response()->json(['category' => $category], 201);
    }

    public function delete($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $category -> delete();

        return response()->json(['message' => 'Categoria eliminata con successo'], 200);
    }
}
