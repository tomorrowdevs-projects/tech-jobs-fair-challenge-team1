<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Department\StoreRequest;
use App\Http\Requests\Department\UpdateRequest;
use App\Http\Resources\Department\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Recupera tutti i contatti dal database
        $departments = Department::all();

        return DepartmentResource::collection($departments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $new_department = Department::create($data);

        return DepartmentResource::make($new_department);
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        return DepartmentResource::make($department);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Department $department)
    {
        $data = $request->validated();

        $department->update($data);

        return DepartmentResource::make($department);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        
        return response()->json([
            'message' => 'Dipartimento eliminato con successo'
        ], 200);
    }
}
