import gql from 'graphql-tag';

const frameworkQuery = gql`
    type Framework {
        id: ID!,
        protocol: String!,
        competitors: [String],
        thesis: String,
        bullcase: String,
        bearcase: String,
        acquisitionStrat: String,
        exitConditions: String,
        user: String!
        naratives: [ID]
    }

    type Query {
        getFramework(id: ID!): Framework
    }

    input FrameworkInput {
        id: ID!,
        protocol: String!,
        competitors: [String],
        thesis: String,
        bullcase: String,
        bearcase: String,
        acquisitionStrat: String,
        exitConditions: String,
        user: String!
        naratives: [ID]
    } 

    type Mutation {
        createFramework(framework: FrameworkInput!): Framework!
        deleteFramework(id: ID!): Boolean!
        editFramework(framework: FrameworkInput!): Framework!
        addFrameworkNarative(id: ID!, narative: ID!): [ID]!
    }
`;

export default frameworkQuery;