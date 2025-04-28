<?php

// app/Http/Controllers/CheckoutController.php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\CartItem;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function getCartItems()
    {
        $cartItems = CartItem::where('user_id', Auth::id())->get();
        return response()->json(['cart_items' => $cartItems, 'status' => 200]);
    }

    public function applyPromoCode(Request $request)
    {
        $promoCode = PromoCode::where('code', $request->code)->first();
        if ($promoCode) {
            return response()->json(['status' => 200, 'discount' => $promoCode->discount]);
        }

        return response()->json(['status' => 400, 'message' => 'Invalid Promo Code']);
    }

    public function placeOrder(Request $request)
    {
        $order = new Order();
        $order->user_id = Auth::id();
        $order->full_name = $request->fullName;
        $order->email = $request->email;
        $order->phone = $request->phone;
        $order->total_amount = $request->totalAmount; // Calculate total including discount, tax, etc.
        $order->discount = $request->discount;
        $order->save();

        // Process cart items and associate with the order
        foreach ($request->cartItems as $item) {
            CartItem::where('id', $item['id'])->update(['order_id' => $order->id]);
        }

        return response()->json(['status' => 200, 'order' => $order]);
    }
}
