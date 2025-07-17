"use client";

import { useCartContext } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Product } from "@/graphql/types";
import { getImageForProductId } from "@/lib/getImageForProduct";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductClientView({ product }: { product: Product }) {
  const { addToCart } = useCartContext();
  const { addToast } = useToast();
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlisted(wishlist.includes(product.id));
  }, [product]);

  const toggleWishlist = () => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let updated;
    if (wishlist.includes(product.id)) {
      updated = wishlist.filter((id: string) => id !== product.id);
    } else {
      updated = [...wishlist, product.id];
    }
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlisted(updated.includes(product.id));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-400">
            The requested product could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const image = getImageForProductId(product.id);
  const productName = product?.name || "Unknown Product";
  const productDescription =
    product?.seoDescription ||
    product?.description ||
    "This is a premium product from our exclusive collection.";
  const productPrice =
    product?.defaultVariant?.pricing?.price?.gross?.amount ?? 0;
  const isAvailable = product?.isAvailableForPurchase ?? false;

  return (
    <article className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="relative w-full h-96 md:h-[32rem] glass-card">
          <Image
            src={image}
            alt={productName}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Product Info */}
        <section className="space-y-6">
          <h1 className="text-4xl font-bold gradient-text">{productName}</h1>
          <p className="text-gray-400">{productDescription}</p>

          <div className="text-2xl font-semibold text-white mt-2">
            ₹{productPrice.toFixed(2)}
          </div>

          <div className="flex gap-4 items-center mt-2">
            <button
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: productName,
                  price: productPrice,
                  quantity: 1,
                  image: image,
                });
                addToast({
                  message: `${productName} added to cart!`,
                  type: "success",
                });
              }}
              className="btn-gradient transition-transform duration-150 active:scale-95"
              disabled={!isAvailable}
              aria-label={isAvailable ? "Add to Cart" : "Out of Stock"}
            >
              {isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              onClick={toggleWishlist}
              aria-label={
                wishlisted ? "Remove from Wishlist" : "Add to Wishlist"
              }
              className={`px-4 py-2 rounded-full border border-pink-400 text-pink-400 transition-all duration-200 hover:bg-pink-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                wishlisted ? "bg-pink-400 text-white" : "bg-transparent"
              }`}
            >
              {wishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
            </button>
          </div>

          <div className="border-t border-white/10 pt-6 text-sm text-gray-400 space-y-2">
            <div>
              <span className="font-semibold text-white">Category:</span>{" "}
              {product?.category?.name || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-white">Type:</span>{" "}
              {product?.productType?.name || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-white">Available:</span>{" "}
              {isAvailable ? "Yes" : "No"}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
