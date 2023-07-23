import gql from "graphql-tag";

export default gql`
  type Narative {
    _id: ID!
    name: String!
    description: String
  }

  type Query {
    getNarativeByName(name: String!): Narative
    getNarativeById(_id: ID!): Narative
  }

  input NarativeInput {
    _id: ID
    name: String!
    description: String
  }

  type Mutation {
    createNarative(narative: NarativeInput!): Narative!
    deleteNarative(_id: ID!): Boolean!
    editNarative(_id: ID!, newNarative: NarativeInput!): Narative!
  }
`;
