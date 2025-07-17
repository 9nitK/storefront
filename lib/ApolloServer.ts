import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "https://saleor-kombee.onrender.com/graphql/",
  credentials: "include",
});

// Error handling link
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // Removed console.error and console.warn for production
      });
    }

    if (networkError) {
      // Removed console.error and console.warn for production
    }
  }
);

// Retry link for failed requests
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error, _operation) => {
      // Retry on network errors and specific GraphQL errors
      return (
        !!error &&
        (error.message.includes("Failed to fetch") ||
          error.message.includes("Network request failed") ||
          (error.message.includes("cursor") &&
            error.message.includes("already exists")))
      );
    },
  },
});

export function getClient() {
  return new ApolloClient({
    link: from([retryLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
      },
    },
  });
}
