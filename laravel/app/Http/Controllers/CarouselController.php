<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carousel;
use Illuminate\Support\Facades\Validator;

class CarouselController extends Controller
{
    // Show a specific carousel item by ID
    public function show($id)
    {
        $carousel = Carousel::find($id);
    
        if (!$carousel) {
            return response()->json(['status' => 404, 'message' => 'Carousel not found'], 404);
        }
    
        return response()->json(['status' => 200, 'carousel' => $carousel]);
    }
    // Store a new carousel item
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'text' => 'required|string',
            'button1_text' => 'nullable|string|max:255',
            'button1_link' => 'nullable|string|max:255',
            'button2_text' => 'nullable|string|max:255',
            'button2_link' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()]);
        }

        $carousel = new Carousel();
        $carousel->name = $request->name;
        $carousel->text = $request->text;
        $carousel->button1_text = $request->button1_text;
        $carousel->button1_link = $request->button1_link;
        $carousel->button2_text = $request->button2_text;
        $carousel->button2_link = $request->button2_link;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/carousel/'), $imageName);
            $carousel->image = 'uploads/carousel/' . $imageName;
        }

        $carousel->save();

        return response()->json(['status' => 200, 'message' => 'Carousel item added successfully!']);
    }

    // Get all carousel items
    public function index()
    {
        $carousels = Carousel::all();
        return response()->json([
            'status' => 200,
            'carousels' => $carousels
        ]);
    }

    // Edit (Update) carousel item by ID
    public function update(Request $request, $id)
    {
        $carousel = Carousel::find($id);
        if (!$carousel) {
            return response()->json(['status' => 404, 'message' => 'Carousel item not found']);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'text' => 'required|string',
            'button1_text' => 'nullable|string|max:255',
            'button1_link' => 'nullable|string|max:255',
            'button2_text' => 'nullable|string|max:255',
            'button2_link' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()]);
        }

        $carousel->name = $request->name;
        $carousel->text = $request->text;
        $carousel->button1_text = $request->button1_text;
        $carousel->button1_link = $request->button1_link;
        $carousel->button2_text = $request->button2_text;
        $carousel->button2_link = $request->button2_link;

        if ($request->hasFile('image')) {
            // Delete old image
            if (file_exists(public_path($carousel->image))) {
                unlink(public_path($carousel->image));
            }

            // Upload new image
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/carousel/'), $imageName);
            $carousel->image = 'uploads/carousel/' . $imageName;
        }

        $carousel->save();

        return response()->json(['status' => 200, 'message' => 'Carousel item updated successfully!']);
    }

    // Delete a carousel item by ID
    public function destroy($id)
    {
        $carousel = Carousel::find($id);
        if ($carousel) {
            // Delete the image from the storage
            if (file_exists(public_path($carousel->image))) {
                unlink(public_path($carousel->image));
            }

            // Delete the carousel item
            $carousel->delete();

            return response()->json(['status' => 200, 'message' => 'Carousel item deleted successfully']);
        } else {
            return response()->json(['status' => 404, 'message' => 'Carousel item not found'], 404);
        }
    }
}
