import { gql, useQuery } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      author {
        username
      }
      imgUrl
      likes {
        username
      }
      content
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPosts($getPostByIdId: String!) {
    getPostById(id: $getPostByIdId) {
      _id
      author {
        name
        username
      }
      authorId
      comments {
        content
        username
      }
      content
      createdAt
      imgUrl
      likes {
        username
      }
      tags
    }
  }
`;

export const SEARCH_USER = gql`
  query SearchUsers($username: String) {
    searchUsers(username: $username) {
      username
      _id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query Query($getUserByIdId: String) {
    getUserById(id: $getUserByIdId) {
      _id
      email
      followerDetails {
        username
        _id
      }
      followingDetails {
        username
        _id
      }
      name
      username
    }
  }
`;
