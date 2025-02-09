
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "https://api.escuelajs.co/graphql", 
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;

