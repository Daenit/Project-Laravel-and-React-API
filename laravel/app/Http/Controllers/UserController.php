<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Fetch user count
    public function getUserCount()
    {
        $userCount = User::count(); // Get the number of users
        return response()->json(['user_count' => $userCount]);
    }

    // Fetch all users (Optional, if you want to show details)
    public function getUsers()
    {
        $users = User::all(); // Fetch all users from the database
        return response()->json(['users' => $users]);
    }
}
