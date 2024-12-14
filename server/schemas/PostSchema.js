import { GraphQLError } from "graphql";
import Post from "../models/post.js";
import { ObjectId } from "mongodb";
import User from "../models/user.js";
import redis from "../config/redis.js";

export const postTypeDefs = `#graphql

  type Post {
    _id: ID,
    content: String!,
    tags: [String],
    imgUrl: String,
    authorId: ID,
    comments: [Comment],
    likes:  [Like],
    createdAt: String,
    updatedAt: String,
  }

  type Comment {
    content: String!,
    username: String!,
    createdAt: String,
    updatedAt: String,
  }

  type Like {
    username: String!,
    createdAt: String,
    updatedAt: String,
  }

  input createPostInput { 
    content: String!,
    tags: [String],
    imgUrl: String,
  }

  type createPostResponse { 
    statusCode : String, 
    message : String, 
    error: String
  }

  input addCommentInput { 
    content: String!,
    postId : ID
  }

  type addCommentResponse { 
    statusCode : String, 
    message : String, 
    error: String
  }

  type addLikeResponse { 
    statusCode : String, 
    message : String, 
    error: String
  }

  type getPostsResponse { 
    _id: ID,
    content: String!,
    tags: [String],
    imgUrl: String,
    authorId: ID,
    comments: [Comment],
    likes:  [Like],
    createdAt: String,
    updatedAt: String,
    author: UserWithoutPassword
  }

  type Mutation { 
    createPost (input: createPostInput ) : createPostResponse,
    addComment (input: addCommentInput) : addCommentResponse,
    addLike (postId : ID ) :  addLikeResponse
  }

  type Query { 
    getPosts : [getPostsResponse]
    getPostById (id: String!) : getPostsResponse
  }
`;

export const postResolvers = {
  Mutation: {
    createPost: async (_, args, contextValue) => {
      const { id: authorId } = await contextValue.doAuthentication();

      const { input } = args;

      if (!input) {
        throw new GraphQLError("Input required to create post");
      }

      const newPost = {
        content: input.content,
        tags: input.tags,
        imgUrl: input.imgUrl,
        authorId: new ObjectId(authorId),
        comments: [],
        likes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await Post.createPost(newPost);

      await redis.del("posts");

      return {
        statusCode: 200,
        message: "Post created",
      };
    },

    addComment: async (_, args, contextValue) => {
      const { id } = await contextValue.doAuthentication();
      const user = await User.findById(id);

      const username = user.username;

      const { input } = args;
      if (!input) {
        throw new GraphQLError("Comment input needed", {
          extensions: {
            http: 400,
            code: "Bad Request",
          },
        });
      }

      const { content, postId } = input;
      const newComment = {
        content,
        username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = Post.addComment(newComment, postId);
      if (!result) {
        throw new GraphQLError("Post not found", {
          extensions: {
            http: 404,
            code: "Not Found",
          },
        });
      }

      return {
        statusCode: 200,
        message: "Comment added succesfully",
      };
    },

    addLike: async (_, args, contextValue) => {
      const { id } = await contextValue.doAuthentication();
      const user = await User.findById(id);
      const username = user.username;

      const { postId } = args;
      if (!postId) {
        throw new GraphQLError("Post id is required", {
          extensions: {
            http: 400,
            code: "Bad Request",
          },
        });
      }

      const newLike = {
        username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await Post.addLike(newLike, postId);
      if (!result) {
        throw new GraphQLError("Post not found", {
          extensions: {
            http: 404,
            code: "Not found",
          },
        });
      }

      return {
        statusCode: 200,
        message: "Like added successfully",
      };
    },
  },

  Query: {
    getPosts: async (_, args, contextValue) => {
      await contextValue.doAuthentication();
      const postCache = await redis.get("posts");

      if (postCache) {
        return JSON.parse(postCache);
      }

      const result = await Post.findAll();
      await redis.set("posts", JSON.stringify(result));
      return result;
    },

    getPostById: async (_, args, contextValue) => {
      await contextValue.doAuthentication();
      const { id } = args;
      const result = await Post.findById(id);

      if (!result) {
        throw new GraphQLError("Post not found");
      }

      return result;
    },
  },
};
