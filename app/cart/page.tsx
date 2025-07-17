"use client";

import { useCartContext } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartContext();

  const safeCart = Array.isArray(cart) ? cart : [];

  const totalAmount = safeCart.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  const handleRemoveFromCart = (id: string) => {
    try {
      if (id && removeFromCart) {
        removeFromCart(id);
      }
    } catch (error) {}
  };

  const handleClearCart = () => {
    try {
      if (clearCart) {
        clearCart();
      }
    } catch (error) {}
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Your Cart</h1>

      {safeCart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {safeCart.map((item) => {
              if (!item?.id) return null;

              return (
                <article
                  key={item.id}
                  className="flex items-center gap-6 p-4 glass-card"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">
                      {item.name || "Unknown Product"}
                    </p>
                    <p className="text-sm text-gray-400">
                      ₹{item.price || 0} × {item.quantity || 0}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    aria-label="Remove from cart"
                    className="p-2 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:scale-110 transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="text-2xl font-semibold text-white">
              Total:{" "}
              <span className="gradient-text">₹{totalAmount.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="btn-gradient">
              Proceed to Checkout
            </Link>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleClearCart}
              className="px-6 py-3 border-2 border-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 backdrop-blur-sm"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
