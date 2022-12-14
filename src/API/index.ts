import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";


export const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          registrations: {
            ...offsetLimitPagination(),
            keyArgs: false,
            merge(existing, incoming, { args: { skip = 0 } } : any) {
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
});
