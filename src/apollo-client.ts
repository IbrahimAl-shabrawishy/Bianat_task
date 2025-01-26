import { ApolloClient, InMemoryCache } from '@apollo/client';

// رابط API الخاص بـ GraphQL
const httpLink = 'https://api.escuelajs.co/graphql';

// إعداد Apollo Client
export const apolloClient = new ApolloClient({
  uri: httpLink, // الرابط
  cache: new InMemoryCache(), // تخزين البيانات مؤقتًا
});

export default apolloClient;
