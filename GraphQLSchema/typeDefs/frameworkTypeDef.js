export default `#graphql
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
        protocol: String
    } 

    type Mutation {
        createFramework(framework: FrameworkInput!): Framework!
        deleteFramework(framework: FrameworkInput!): Boolean!
    }
`;