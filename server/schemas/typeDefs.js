// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Payment {
    _id: ID
    paymentAmount: String
    createdAt: String
    username: String
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
   
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }


  type PayDetails {
    _id: ID
    cardNumber: String
    expirationDate: String
    cvv: String
    firstName: String
    lastName: String
    streetFirst: String
    streetSecond: String
    city: String
    state: String
    postal: String
  
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
   
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
    payments(username: String): [Payment]
    payDetails(_id: ID!): PayDetails
  

    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    
    addThought(thoughtText: String!): Thought
    addPayment(paymentAmount: String!): Payment
    addReaction(postId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
    addPayDetails(username: String!): PayDetails
  }

  type Auth {
    token: ID!
    user: User
  }


`;

// export the typeDefs
module.exports = typeDefs;
