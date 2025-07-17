"use client";

import { useCartContext } from "@/context/CartContext";
import { CheckoutForm, checkoutSchema } from "@/form-schema/checkout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function CheckoutPageClient() {
  const { cart } = useCartContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const safeCart = Array.isArray(cart) ? cart : [];

  const totalAmount = safeCart.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  const onSubmit = (data: CheckoutForm) => {
    try {
      if (!data?.name) {
        alert("Please provide your name.");
        return;
      }
      alert(`🎉 Order placed by ${data.name}!`);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Cart Summary */}
        <section className="glass-card">
          <h2 className="text-2xl font-bold mb-6 gradient-text">
            Order Summary
          </h2>
          {safeCart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {safeCart.map((item) => {
                if (!item?.id) return null;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-white/10 pb-4"
                  >
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10">
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
                  </div>
                );
              })}
              <div className="mt-6 text-xl font-semibold text-white">
                Total:{" "}
                <span className="gradient-text">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}
        </section>

        {/* Shipping Form */}
        <section className="glass-card">
          <h2 className="text-2xl font-bold mb-6 gradient-text">
            Shipping Details
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="input-field"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Shipping Address"
                className="input-field"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <button type="submit" className="w-full btn-gradient">
              Place Order
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
