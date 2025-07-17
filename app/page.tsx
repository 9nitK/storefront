import { GET_PRODUCTS } from "@/graphql/queries";
import { ProductsQuery } from "@/graphql/types";
import { getClient } from "@/lib/ApolloServer";
import ProductListView from "@/views/products/ProductListView";
import { Metadata } from "next";

// Revalidate every 5 minutes for fresh data
export const revalidate = 300;

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Products | Kombee Storefront",
  description:
    "Discover our exclusive collection of premium products. Shop the latest trends with secure checkout and fast delivery.",
  keywords: "products, shopping, e-commerce, premium collection",
  openGraph: {
    title: "Products | Kombee Storefront",
    description: "Discover our exclusive collection of premium products.",
    type: "website",
  },
};

export default async function ProductsPage() {
  try {
    // Server-side data fetching for SSR
    const { data, error } = await getClient().query<ProductsQuery>({
      query: GET_PRODUCTS,
      variables: {
        first: 12,
        channel: "online-inr",
      },
      errorPolicy: "all",
    });

    // Handle GraphQL errors
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Failed to load products</h1>
            <p className="text-gray-400">Please try again later.</p>
          </div>
        </div>
      );
    }

    return <ProductListView initialData={data} />;
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }
}
