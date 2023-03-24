<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Blog;
use Exception;

class BlogController extends Controller
{
    //
    public function blog()
    {
        $blogs = Blog::all();
    
        $json = json_encode($blogs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        $json = preg_replace('/[^\x20-\x7E]/u', '', $json);
    
        return response($json, 200)->header('Content-Type', 'application/json');
    }
    public function show($id)
    {
        try {
            $blog = Blog::findOrFail($id);
            $json = json_encode($blog, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            $json = preg_replace('/[^\x20-\x7E]/u', '', $json);
            return response($json, 200)->header('Content-Type', 'application/json');
        } catch (Exception $ex) {
            return response('Blog not found.', 404)->header('Content-Type', 'text/plain');
        }
    }
}

