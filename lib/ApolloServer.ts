import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: "include",
});

// Handle GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV !== "production") {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }
});

// Retry failed network requests
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error) =>
      !!error &&
      (error.message.includes("Failed to fetch") ||
        error.message.includes("Network request failed") ||
        (error.message.includes("cursor") &&
          error.message.includes("already exists"))),
  },
});

// Create Apollo Client instance
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
