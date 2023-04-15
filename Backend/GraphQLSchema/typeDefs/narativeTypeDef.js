import gql from 'graphql-tag';

export default gql`
    type Narative {
        id: ID!,
        name: String!,
        description: String
    }

    type Query {
        getNarativeByName(name: String!): Narative,
        getNarativeById(id: ID!): Narative,
    }

    input NarativeInput {
        id: ID!,
        name: String!,
        description: String
    } 

    type Mutation {
        createNarative(narative: NarativeInput!): Narative!
        deleteNarative(id: ID!): Boolean!
        editNarative(id: ID!, newNarative: NarativeInput!): Narative!
    }
`;