<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{

    public function all()
    {
        $departments = Department::all();

        return response()->json(['departments' => $departments], 200);
    }

    public function create(Request $request)
    {

        $department = Department::create([
            'name' => $request->name
        ]);
        return response()->json(['department' => $department], 201);
    }

    public function delete($id)
    {
        $department = Department::find($id);
        if (!$department) {
            return response()->json(['error' => 'Department not found'], 404);
        }

        $department -> delete();

        return response()->json(['message' => 'Dipartimento eliminato con successo'], 200);
    }
}
