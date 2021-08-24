import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($postId: ID!, $reactionBody: String!) {
    addReaction(postId: $postId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation addPayment($paymentAmount: String!) {
    addPayment(paymentAmount: $paymentAmount) {
      _id
      paymentAmount
      createdAt
      username
    }
  }
`;

export const ADD_PAYTYPE = gql`
  mutation addPaymentType($cardNumber: Number!, 
                          $expirationDate: Date!,
                          $cvv: String!,
                          $firstName: String!,
                          $lastName: String!,
                          $streetFirst: String!,
                          $streetSecond: String!,
                          $city: String!,
                          $state: String!,
                          $postal: String!) {
      addPaymentType(cardNumber: $cardNumber, 
        expirationDate: $expirationDate,
        cvv: $cvv,
        firstName: $firstName,
        lastName: $lastName,
        streetFirst: $streetFirst,
        streetSecond: $streetSecond,
        city: $city,
        state: $state,
        postal: $postal) {
          _id
          token
          username

      }
    }
`;
