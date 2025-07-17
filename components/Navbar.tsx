"use client";

import { useCartContext } from "@/context/CartContext";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { cart } = useCartContext();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Store front
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/checkout"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Checkout
          </Link>

          <Link
            href="/cart"
            className="relative hover:text-purple-400 transition-colors duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            href="/login"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
