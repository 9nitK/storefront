import { GET_PRODUCT, GET_PRODUCT_SLUGS } from "@/graphql/queries";
import { getClient } from "@/lib/ApolloServer";
import ProductClientView from "@/views/products/ProductClientView";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const { data } = await getClient().query({
      query: GET_PRODUCT_SLUGS,
      variables: { first: 100, channel: "online-inr" },
    });

    return data.products.edges
      .filter(({ node }: { node: { slug?: string } }) => node?.slug)
      .map(({ node }: { node: { slug: string } }) => ({ slug: node.slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await getClient().query({
      query: GET_PRODUCT,
      variables: { slug: slug, channel: "online-inr" },
    });

    const product = data?.product;

    return {
      title:
        product?.seoTitle || product?.name || "Product | Kombee Storefront",
      description:
        product?.seoDescription ||
        product?.description ||
        "Product details page.",
      openGraph: {
        title:
          product?.seoTitle || product?.name || "Product | Kombee Storefront",
        description:
          product?.seoDescription ||
          product?.description ||
          "Product details page.",
        type: "website",
      },
    };
  } catch (error) {
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

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { slug } = await params;
    const { data } = await getClient().query({
      query: GET_PRODUCT,
      variables: { slug, channel: "online-inr" },
    });

    const product = data?.product;
    if (!product) return notFound();

    return <ProductClientView product={product} />;
  } catch (error) {
    return notFound();
  }
}
