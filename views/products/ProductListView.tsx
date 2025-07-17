"use client";

import ProductSearchBox from "@/components/ProductSearchBox";
import SkeletonProductCard from "@/components/SkeletonProductCard";
import { useCartContext } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { GET_PRODUCTS } from "@/graphql/queries";
import { Product, ProductsQuery } from "@/graphql/types";
import { getImageForProductId } from "@/lib/getImageForProduct";
import { useApolloClient, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// MVP: Sorting and filtering options
const SORT_OPTIONS = [
  { label: "Relevance", value: null },
  { label: "Price: Low to High", value: { field: "PRICE", direction: "ASC" } },
  { label: "Price: High to Low", value: { field: "PRICE", direction: "DESC" } },
  { label: "Name: A-Z", value: { field: "NAME", direction: "ASC" } },
  { label: "Name: Z-A", value: { field: "NAME", direction: "DESC" } },
];

interface ProductListViewProps {
  initialData: ProductsQuery;
}

function ProductCard({ node }: { node: Product }) {
  const image = getImageForProductId(node.id);
  const price = node?.defaultVariant?.pricing?.price?.gross?.amount ?? 0;
  const isAvailable = node?.isAvailableForPurchase;
  const [imgSrc, setImgSrc] = useState(image);
  return (
    <article
      className="group relative glass-card p-4 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 flex flex-col justify-between h-[32rem]"
      aria-label={node.name}
    >
      {/* Product details link */}
      <div className="flex-1">
        <Link
          href={`/${node.slug}`}
          className="block h-full"
          tabIndex={0}
          aria-label={`View details for ${node.name}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative w-full h-48 mb-4">
            <Image
              src={imgSrc}
              alt={node.name}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              onError={() => setImgSrc("/placeholder.png")}
            />
          </div>
          <h2 className="text-lg font-semibold mb-1 text-white group-hover:text-purple-300 transition-colors duration-300 gradient-text">
            {node.name}
          </h2>
          <p className="text-sm text-gray-400 line-clamp-2 mb-2">
            {node.seoTitle || node.seoDescription}
          </p>
          <div className="text-white text-sm space-y-1 mb-4">
            <div>
              <span className="font-semibold">Price:</span> ₹{price.toFixed(2)}
            </div>
            <div>
              <span className="font-semibold">Category:</span>{" "}
              {node.category?.name || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Available:</span>{" "}
              {isAvailable ? (
                <span className="text-green-400">In Stock</span>
              ) : (
                <span className="text-red-400">Out of Stock</span>
              )}
            </div>
          </div>
        </Link>
      </div>
      {/* No wishlist or cart button */}
    </article>
  );
}

export default function ProductListView({ initialData }: ProductListViewProps) {
  const { addToCart } = useCartContext();
  const { addToast } = useToast();
  const client = useApolloClient();
  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState("");
  const [variables, setVariables] = useState({
    first: 20,
    channel: "online-inr",
    search: "",
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Apollo query for products
  const { data, loading, error, fetchMore, refetch } = useQuery<ProductsQuery>(
    GET_PRODUCTS,
    {
      variables: {
        ...variables,
        search: variables.search,
      },
      fetchPolicy: "cache-first",
      onCompleted: (data) => {
        setEndCursor(data?.products?.pageInfo?.endCursor || null);
        setHasNextPage(data?.products?.pageInfo?.hasNextPage ?? false);
      },
    }
  );

  // Debounced server-side search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setVariables((prev) => ({ ...prev, search }));
      refetch({ ...variables, search });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  // Infinite scroll effect
  useEffect(() => {
    if (!hasNextPage) return;
    const handleScroll = () => {
      if (!listRef.current) return;
      const { bottom } = listRef.current.getBoundingClientRect();
      if (bottom <= window.innerHeight + 200 && !loadingMore) {
        setLoadingMore(true);
        fetchMore({
          variables: {
            ...variables,
            after: endCursor,
            search: variables.search,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            setEndCursor(fetchMoreResult.products.pageInfo.endCursor || null);
            setHasNextPage(
              fetchMoreResult.products.pageInfo.hasNextPage ?? false
            );
            setLoadingMore(false);
            return {
              products: {
                ...fetchMoreResult.products,
                edges: [
                  ...prev.products.edges,
                  ...fetchMoreResult.products.edges,
                ],
              },
            };
          },
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, loadingMore, endCursor, variables, fetchMore]);

  // Use server data or fallback to initialData
  const productEdges =
    data?.products?.edges || initialData?.products?.edges || [];

  // Loading state
  if (loading && productEdges.length === 0) {
    return (
      <section className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Products</h1>
        <ProductSearchBox value={search} onSearch={setSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonProductCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  // Error or empty state
  if (!productEdges.length) {
    return (
      <section className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Products</h1>
        <ProductSearchBox value={search} onSearch={setSearch} />
        <p className="text-center text-gray-400">
          No products found or failed to load products.
        </p>
      </section>
    );
  }

  return (
    <section
      className="max-w-7xl mx-auto p-6"
      aria-labelledby="products-heading"
    >
      <h1
        id="products-heading"
        className="text-3xl font-bold mb-8 gradient-text"
      >
        Products
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <ProductSearchBox value={search} onSearch={setSearch} />
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 min-h-[48rem]"
        ref={listRef}
      >
        {productEdges.map(({ node }) => {
          if (!node) return null;
          return <ProductCard key={node.id} node={node as Product} />;
        })}
        {/* Infinite scroll loading skeletons */}
        {hasNextPage &&
          loadingMore &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonProductCard key={"skel-" + i} />
          ))}
      </div>
    </section>
  );
}
