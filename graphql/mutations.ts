// graphql/mutations.ts
import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      user {
        email
      }
      errors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        token
        lines {
          id
          quantity
          variant {
            id
            name
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
