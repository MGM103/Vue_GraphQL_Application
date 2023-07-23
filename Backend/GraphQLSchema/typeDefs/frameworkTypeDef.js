import gql from "graphql-tag";

const frameworkQuery = gql`
  type Framework {
    _id: ID!
    protocol: String!
    competitors: [String]
    thesis: String
    bullcase: String
    bearcase: String
    acquisitionStrat: String
    exitConditions: String
    user: String!
    naratives: [ID]
  }

  type Query {
    getFrameworkById(_id: ID!): Framework
  }

  input FrameworkInput {
    _id: ID
    protocol: String!
    competitors: [String]
    thesis: String
    bullcase: String
    bearcase: String
    acquisitionStrat: String
    exitConditions: String
    user: String!
    naratives: [ID]
  }

  type Mutation {
    createFramework(framework: FrameworkInput!): Framework!
    deleteFramework(_id: ID!): Boolean!
    editFramework(_id: ID!, newFramework: FrameworkInput!): Framework!
    addFrameworkNarative(_id: ID!, narative: ID!): [ID]!
  }
`;

export default frameworkQuery;
