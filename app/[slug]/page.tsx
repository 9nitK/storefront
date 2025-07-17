import { GET_PRODUCT, GET_PRODUCT_SLUGS } from "@/graphql/queries";
import { getClient } from "@/lib/ApolloServer";
import ProductClientView from "@/views/products/ProductClientView";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const { data } = await getClient().query({
      query: GET_PRODUCT_SLUGS,
      variables: { first: 100, channel: "online-inr" },
    });

    return data.products.edges
      .filter(({ node }: { node: { slug?: string } }) => node?.slug)
      .map(({ node }: { node: { slug: string } }) => ({ slug: node.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await getClient().query({
      query: GET_PRODUCT,
      variables: { slug, channel: "online-inr" },
    });

    const product = data?.product;

    return {
      title:
        product?.seoTitle || product?.name || "Product | Kombee Storefront",
      description:
        product?.seoDescription ||
        product?.description ||
        "Product details page.",
    };
  } catch {
    return {
      title: "Product | Kombee Storefront",
      description: "Product details page.",
      openGraph: {
        title: "Product | Kombee Storefront",
        description: "Product details page.",
        type: "website",
      },
    };
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  try {
    const { data } = await getClient().query({
      query: GET_PRODUCT,
      variables: { slug, channel: "online-inr" },
    });

    const product = data?.product;
    if (!product) return notFound();

    return <ProductClientView product={product} />;
  } catch {
    return notFound();
  }
}
