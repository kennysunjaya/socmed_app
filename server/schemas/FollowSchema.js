import { ObjectId } from "mongodb";
import Follow from "../models/follow.js";

export const followTypeDefs = `#graphql

  type Follow {
    _id: ID,
    followingId: ID,
    followerId: ID,
    createdAt: String,
    updatedAt: String,
  }

  type createFollowResponse { 
    statusCode : String, 
    message : String, 
    error : String
  }

  type Query { 
    follows : [Follow]
  }

  type Mutation { 
    createFollow(followingId: ID) : createFollowResponse
  }

`;

export const followResolvers = {
  Query: {
    follows: async (_, args, contextValue) => {
      await contextValue.doAuthentication();
      const follows = await Follow.findAll();

      return follows;
    },
  },

  Mutation: {
    createFollow: async (_, args, contextValue) => {
      const { followingId } = args;
      const { id: followerId } = await contextValue.doAuthentication();

      const newFollow = {
        followingId: new ObjectId(followingId),
        followerId: followerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await Follow.create(newFollow);

      console.log(result);

      return {
        statusCode: 200,
        message: "Followed",
      };
    },
  },
};
