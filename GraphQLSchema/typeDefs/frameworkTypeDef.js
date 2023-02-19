import gql from 'graphql-tag';

const frameworkQuery = gql`
    type Framework {
        id: ID!,
        protocol: String,
        naratives: [Narative],
        competitors: [String],
        thesis: String,
        bullcase: String,
        bearcase: String,
        acquisitionStrat: String,
        exitConditions: String,
        user: User!
    }

    type Query {
        getFramework(id: ID!): Framework,
        getFrameworksByProtocol(protocol: String!): [Framework]
    }

    input FrameworkInput {
        id: ID!,
        protocol: String!,
        competitors: [String],
        thesis: String,
        bullcase: String,
        bearcase: String,
        acquisitionStrat: String,
        exitConditions: String
    } 

    type Mutation {
        createFramework(framework: FrameworkInput!): Framework!
        deleteFramework(framework: FrameworkInput!): Boolean!
        editFramework(framework: FrameworkInput!): Framework!
    }
`;

export default frameworkQuery;