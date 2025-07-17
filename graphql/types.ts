export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  defaultVariant?: {
    id: string;
    name: string;
    sku: string;
    pricing?: {
      priceUndiscounted?: {
        gross: {
          amount: number;
          currency: string;
        };
      };
      price?: {
        gross: {
          amount: number;
          currency: string;
        };
      };
    };
  };
  variants: {
    id: string;
    name: string;
    sku: string;
    pricing?: {
      price?: {
        gross: {
          amount: number;
          currency: string;
        };
      };
    };
    attributes: {
      attribute: {
        id: string;
        name: string;
      };
      values: {
        id: string;
        name: string;
      }[];
    }[];
  }[];
  media: {
    id: string;
    url: string;
    alt?: string;
    type?: string;
  }[];
  attributes: {
    attribute: {
      id: string;
      name: string;
    };
    values: {
      id: string;
      name: string;
    }[];
  }[];
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  productType?: {
    id: string;
    name: string;
  };
  isAvailableForPurchase: boolean;
  availableForPurchase?: string;
}

export interface ProductsQuery {
  products: {
    edges: {
      cursor: string;
      node: Product;
    }[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}
