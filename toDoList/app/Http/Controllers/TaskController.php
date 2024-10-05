<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);


        $task = Task::create([
            'name' => $request->name,
            'is_completed' => false,
        ]);
        return response()->json($task, 201);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name' => 'required|string|max:255',
            'is_completed' => 'required|boolean',
        ]);

        $task = Task::findOrFail($id);
        $task->update([ 
            'name' => $request->name,
            'is_completed' => $request->is_completed,
        ]);
        return response()->json(['message' => 'Task updated successfully','task' => $task]);
    }

    public function delete($id){
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully'], 200);
    }

}
