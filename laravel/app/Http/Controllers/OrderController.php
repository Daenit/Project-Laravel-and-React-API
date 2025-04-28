<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;  // Assuming you have a Cart model
use App\Models\Order; // Assuming you have an Order model

class OrderController extends Controller
{
    // Fetch Cart Items
    public function getCartItems()
    {
        try {
            // Assuming the cart items are stored in the session or a Cart model
            $cartItems = Cart::getItems();  // You can adjust this to your actual cart logic
            
            return response()->json([
                'status' => 200,
                'cart_items' => $cartItems,
            ]);
        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'message' => 'Error fetching cart items']);
        }
    }

    // Apply Promo Code
    public function applyPromoCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:255',
        ]);

        $promoCode = $request->input('code');
        $discount = 0;

        // Example logic for applying a promo code
        if ($promoCode === 'DISCOUNT10') {
            $discount = 10;
        }

        return response()->json([
            'status' => 200,
            'discount' => $discount,
        ]);
    }

    // Place Order
    public function placeOrder(Request $request)
    {
        // Example order logic (replace with your own)
        $orderData = $request->all();
        $order = Order::create([
            'user_id' => auth()->user()->id,
            'total' => $orderData['total'],
            'status' => 'pending',
            // Add other fields as necessary
        ]);

        return response()->json([
            'status' => 200,
            'order' => $order,
        ]);
    }
}
