<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;


class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    //
    public function register(Request $request){
        //validate data 

        //dd($request);
        $this->validate($request,[
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);
        // end validation
        
        //email check 
        $existingUser = User::where('email', $request->input('email'))->first();
    if ($existingUser) {
        $code = 400;
        $output = [
            'code' => $code,
            'message' => 'Email already exists'
        ];
        return response()->json($output, $code);
    }
        //register user
        try {
            $user = new User;
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
           


            if($user->save() ){
                $code = 200;
                $output = [
                    'user' => $user,
                    'code' => $code,
                    'message' => 'User Created Successfully'

                ];
            }else{
                $code = 500;
                $output = [
                   
                    'code' => $code,
                    'message' => 'An error occured'

                ];

            }

        } catch (Exception $e) {
            //dd($e->getMessage());
            $code = 500;
            $output = [
                
                'code' => $code,
                'message' => 'User Not Created Successfully'

            ];
        }


        return response()->json($output, $code);


    }
    public function login(Request $request) {
        // Validate request
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        // Find user by email
        $user = User::where('email', $request->input('email'))->first();
    
        // Check if user exists and password matches
        if ($user && Hash::check($request->input('password'), $user->password)) {
            // Password matches, return success response
            $code = 200;
            $output = [
                'user' => $user,
                'code' => $code,
                'message' => 'Login successful'
            ];
        } else {
            // Invalid email or password, return error response
            $code = 401;
            $output = [
                'code' => $code,
                'message' => 'Invalid email or password'
            ];
        }
    
        return response()->json($output, $code);
    }
    public function getUserFullName(Request $request)
{
    $user = $request->Users();
    $firstName = $user->first_name;
    $lastName = $user->last_name;
    $fullName = $firstName . ' ' . $lastName;
    return response()->json(['fullName' => $fullName]);
}
    
}
