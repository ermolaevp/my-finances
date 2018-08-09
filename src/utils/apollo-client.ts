import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';

const cache = new InMemoryCache();

const defaultState = {};

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
    },
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          // tslint:disable-next-line
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );
      }
      if (networkError) {
        // tslint:disable-next-line
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    authLink.concat(httpLink),
  ]),
});

export default client;
