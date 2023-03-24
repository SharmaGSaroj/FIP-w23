<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\forum;
use App\Models\Users;
use Illuminate\Support\Facades\public_path;

class ForumController extends Controller{
     /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Store a newly created forum post in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'content' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
           
        ]);

        $post = new Forum;
        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->register_id = mt_rand(15, 30);
        //$post->post_time = now();
       // $post->register_id = $request->input('register_id'); // save user id with the forum post
         // Save the image to the server
         $image = $request->file('image');
         $imageData = base64_encode(file_get_contents($image->path()));
         
         // store the base64 encoded string in the database
         $post->image = $imageData;
   

    // Save the image path in the database
    
        if ($post->save()) {
            // Get the user's name from 

    
            // Build the response with the post data and user's name
            $output = [
                'message' => 'Post created successfully',
                'post' => $post,
            ];
            $code = 200;
        } else {
            $output = [
                'message' => 'Error creating post',
            ];
            $code = 500;
        }
    
        return response()->json($output, $code);
    }
    public function showAll()
    {
        $posts = Forum::join('users', 'forums.register_id', '=', 'users.id')
                        ->select('forums.*', 'users.first_name')
                        ->get();
        foreach($posts as $post){
            $post->created_at_formatted = $post->created_at->format('Y-m-d H:i:s');
        }
        return response()->json($posts);
    }
    
    
    

}