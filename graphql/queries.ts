// graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts(
    $first: Int!
    $after: String
    $channel: String!
    $search: String
  ) {
    products(first: $first, after: $after, channel: $channel, search: $search) {
      edges {
        cursor
        node {
          id
          name
          slug
          availableForPurchaseAt
          seoTitle
          seoDescription
          media {
            id
            url
            alt
          }
          attributes {
            attribute {
              id
              name
            }
            values {
              id
              name
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($slug: String, $channel: String) {
    product(slug: $slug, channel: $channel) {
      id
      name
      slug
      description
      seoTitle
      seoDescription

      media {
        id
        url
        alt
        type
      }
      attributes {
        attribute {
          id
          name
        }
        values {
          id
          name
        }
      }
      category {
        id
        name
        slug
      }
      isAvailableForPurchase
      availableForPurchase
    }
  }
`;

export const GET_PRODUCT_SLUGS = gql`
  query GetProductSlugs($first: Int!, $channel: String!) {
    products(first: $first, channel: $channel) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_SEARCH = gql`
  query GetProductsBySearch($first: Int!, $channel: String!, $search: String) {
    products(first: $first, channel: $channel, search: $search) {
      edges {
        node {
          id
          name
          slug
          seoTitle
          seoDescription
          media {
            url
            alt
          }
          category {
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
