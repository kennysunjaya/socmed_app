import { GraphQLError } from "graphql";
import User from "../models/user.js";
import { signToken } from "../utils/jwt.js";

export const userTypeDefs = `#graphql

  type User {
    _id: ID,
    name: String,
    username: String!, 
    email: String!, 
    password: String!
  }

  type UserWithoutPassword { 
    _id: ID,
    name: String,
    username: String!, 
    email: String!, 
  }

  type Query { 
    searchUsers (username: String) : [User],
    getUserById (id: String) : getUserByIdResponse
  }

  type Mutation { 
    createUser (body: AddUser): GeneralResponse
    userLogin (username: String!, password: String!): UserLoginResponse
  }

  type getUserByIdResponse { 
    _id: ID,
    name: String,
    username: String!, 
    email: String!,
    followers: [Follow],
    followerDetails: [User],
    following: [Follow],
    followingDetails: [User] 
  }
  
  input AddUser { 
    name: String,
    username: String!, 
    email: String!, 
    password: String!
  }

  type GeneralResponse { 
    message: String,
  }

  type UserLoginResponse { 
    statusCode : String,
    message: String,
    error: String, 
    data: UserLoginData
  }

  type UserLoginData { 
    token: String,
    id : String 
  }


`;

export const userResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      console.log(args);

      const { body } = args;
      const response = await User.create(body);

      return response;
    },

    userLogin: async (_, args) => {
      const { username, password } = args;
      const user = await User.getUserByUsername(username);

      if (!user || password !== user.password) {
        throw new GraphQLError("Invalid username or password");
      }

      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
      };

      const token = signToken(payload);

      return {
        statusCode: 200,
        message: "Login Successful",
        error: null,
        data: {
          token: token,
          id: user._id,
        },
      };
    },
  },

  Query: {
    searchUsers: async (_, args, contextValue) => {
      await contextValue.doAuthentication();
      const { username } = args;

      if (!username) {
        throw new GraphQLError("Bad request");
      }

      const users = await User.search(username);

      return users;
    },

    getUserById: async (_, args, contextValue) => {
      await contextValue.doAuthentication();
      const { id } = args;

      if (!id) {
        throw new GraphQLError("Bad Request");
      }

      const user = await User.findById(id);

      if (!user) {
        throw new GraphQLError("User not found");
      }

      return user;
    },
  },
};
