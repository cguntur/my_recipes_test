import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_USER = gql`
query Query($userId: ID!) {
  user(userId: $userId) {
    _id
    email
    username
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;