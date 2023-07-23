import gql from "graphql-tag";

export default gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    frameworks: [ID]
  }

  type Query {
    getUserFrameworks(_id: ID!): [String]
    getUserById(_id: ID!): User
    getUserByName(name: String!): User
  }

  input UserInput {
    _id: ID
    username: String!
    password: String!
    frameworks: [ID]
  }

  type Mutation {
    createUser(user: UserInput!): User!
    deleteUser(_id: ID!): Boolean!
    changePassword(_id: ID!, password: String!): Boolean!
    addFramework(_id: ID!, framework: ID!): [ID]!
  }
`;
