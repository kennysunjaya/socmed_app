if (process.env.NODE_ENV !== "production") {
  (async () => {
    await import("dotenv/config");
  })();
}

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userResolvers, userTypeDefs } from "./schemas/UserSchema.js";
import { followResolvers, followTypeDefs } from "./schemas/FollowSchema.js";
import { authentication } from "./utils/auth.js";
import { postResolvers, postTypeDefs } from "./schemas/PostSchema.js";

const server = new ApolloServer({
  typeDefs: [userTypeDefs, followTypeDefs, postTypeDefs],
  resolvers: [userResolvers, followResolvers, postResolvers],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
  context: async ({ req, res }) => {
    return {
      doAuthentication: async () => await authentication(req),
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
