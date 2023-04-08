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
    } 

    type Mutation {
        createFramework(framework: FrameworkInput!): Framework!
        deleteFramework(id: ID!): Boolean!
        editFramework(framework: FrameworkInput!): Framework!
    }
`;

export default frameworkQuery;