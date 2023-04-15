import gql from 'graphql-tag';

export default gql`
    type User {
        id: ID!,
        username: String,
        password: String,
        frameworks: [ID]
    }

    type Query {
        getUserFrameworks(id: ID!): [String],
        getUserById(id: ID!): User,
        getUserByName(name: String!): User
    }

    input UserInput {
        id: ID!,
        username: String,
        password: String,
        frameworks: [ID]
    } 

    type Mutation {
        createUser(user: UserInput!): User!
        deleteUser(id: ID!): Boolean!
        changePassword(id: ID!, password: String!): Boolean!
        addFramework(id: ID!, framework: ID!): [ID]!
    }
`;