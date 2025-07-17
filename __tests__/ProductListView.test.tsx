import { Product, ProductsQuery } from "@/graphql/types";
import ProductListView from "@/views/products/ProductListView";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockProducts: ProductsQuery = {
  products: {
    edges: [
      {
        cursor: "1",
        node: {
          id: "1",
          name: "Diamond Necklace",
          slug: "diamond-necklace",
          defaultVariant: {
            id: "v1",
            name: "Diamond Necklace Variant",
            sku: "SKU1",
            pricing: { price: { gross: { amount: 1000, currency: "USD" } } },
          },
          category: { id: "cat1", name: "Jewelry", slug: "jewelry" },
          isAvailableForPurchase: true,
          variants: [],
          media: [],
          attributes: [],
          productType: { id: "pt1", name: "Type1" },
          seoTitle: "",
          seoDescription: "",
        } as Product,
      },
      {
        cursor: "2",
        node: {
          id: "2",
          name: "Gold Ring",
          slug: "gold-ring",
          defaultVariant: {
            id: "v2",
            name: "Gold Ring Variant",
            sku: "SKU2",
            pricing: { price: { gross: { amount: 500, currency: "USD" } } },
          },
          category: { id: "cat1", name: "Jewelry", slug: "jewelry" },
          isAvailableForPurchase: true,
          variants: [],
          media: [],
          attributes: [],
          productType: { id: "pt1", name: "Type1" },
          seoTitle: "",
          seoDescription: "",
        } as Product,
      },
    ],
    pageInfo: { endCursor: "2", hasNextPage: true },
  },
};

describe("ProductListView", () => {
  it("renders product names and Load More button", () => {
    render(<ProductListView initialData={mockProducts} />);
    expect(screen.getByText("Diamond Necklace")).toBeInTheDocument();
    expect(screen.getByText("Gold Ring")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /load more/i })
    ).toBeInTheDocument();
  });
});
