<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pledge;
use Illuminate\Support\Facades\Hash;
use Exception;


class PledgeController  extends Controller{
    public function pledge(Request $request)
    {
        // Validate form data
        $this->validate($request, [
            'fullname' => 'required',
            'email' => 'required|email',
        ]);

        // Save pledge to database
        $pledge = new Pledge;
        $pledge->name = $request->input('fullname');
        $pledge->email = $request->input('email');
        $pledge->save();

        // Count number of pledges
        $count = Pledge::count();

        // Return response
        return response()->json([
            'message' => 'Thank you for taking the pledge!',
            'count'
        ]);
    }
    public function getCount()
    {
        $count = Pledge::count();

        return response()->json([
            'count' => $count,
        ]);
    }
}
