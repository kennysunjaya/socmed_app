import { GraphQLError } from "graphql";
import { verifyToken } from "./jwt.js";
import User from "../models/user.js";

const authentication = async (req) => {
  const headerAuthorization = req.headers.authorization;

  if (!headerAuthorization) {
    throw new GraphQLError("You are not authenticated", {
      extensions: {
        http: "401",
        code: "Unauthenticated",
      },
    });
  }

  const token = headerAuthorization.split(" ")[1];

  const payload = verifyToken(token);

  const user = await User.getUserByUsername(payload.username);

  if (!user) {
    throw new GraphQLError("You are not authenticated", {
      extensions: {
        http: "401",
        code: "Unauthenticated",
      },
    });
  }

  return {
    id: user._id,
    name: user.name,
    username: user.username,
  };
};

export { authentication };
