import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation Mutation($input: createPostInput) {
    createPost(input: $input) {
      error
      message
      statusCode
    }
  }
`;

export const DO_LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      data {
        token
        id
      }
      error
      message
      statusCode
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation($input: addCommentInput) {
    addComment(input: $input) {
      message
      error
      statusCode
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($body: AddUser) {
    createUser(body: $body) {
      message
    }
  }
`;

export const ADD_LIKE = gql`
  mutation Mutation($postId: ID) {
    addLike(postId: $postId) {
      message
      error
    }
  }
`;

export const CREATE_FOLLOW = gql`
  mutation CreateFollow($followingId: ID) {
    createFollow(followingId: $followingId) {
      message
    }
  }
`;
