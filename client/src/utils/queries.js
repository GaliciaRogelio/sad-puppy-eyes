import { gql } from "@apollo/client";

// export const PAYMENT_OPTION = gql`
//   query payOptions()

export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_THOUGHT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_PAYMENTS = gql`
  query payments($username: String) {
    payments(username: $username) {
      _id
      paymentAmount
      createdAt
      username
    }
  }
`;

export const QUERY_PAYMENT = gql`
  query payment($id: ID!) {
    payment(_id: $id) {
      _id
      paymentAmount
      createdAt
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
      }
      paydetails {
        _id
      }
    }
  }
`;

export const QUERY_ADD_CARD = gql`
  query addCard($cardNumber: String!) {
    addCard(cardNumber: $cardNumber) {
      _id
      cardNumber
    }
  }
`;




export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;

export const QUERY_PAYTYPE = gql`
query paydetails($id: ID!) {
  paydetails(_id: $id) {
    _id
    cardnumber
    expirationDate
    cvv
    firstName
    lastName
    streetFirst
    streetSecond
    city
    state
    postal  
    }
  }
`;