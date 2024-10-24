const typeDefs = `
   type User {
    _id: ID
    username: String
    email: String!
  }

  type Auth {
    token: String!
    user: User
  }
  
  type Query {
    users: [User]
    user(userId: ID!): User
    currentUser: User
  }

  type Mutation {
   createUser(username: String!, email: String!, password: String!): Auth
   login(email: String!, password: String): Auth
}
`;

module.exports = typeDefs;