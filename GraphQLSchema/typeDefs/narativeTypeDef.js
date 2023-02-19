export default `#graphql
    type Narative {
        id: ID!,
        name: String,
        description: String,
        frameworks: [Framework]
    }

    type Query {
        getNarativeByName(name: String!): Narative,
        getNarativeById(id: ID!): Narative,
        getNarativeFrameworks(name: String!): [Framework]
    }

    input NarativeInput {
        id: ID!,
        name: String
    } 

    type Mutation {
        createNarative(user: NarativeInput!): Narative!
        deleteNarative(user: NarativeInput!): Boolean
        editNarative(id: ID!): Narative
    }
`;