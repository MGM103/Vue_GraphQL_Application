import gql from 'graphql-tag';

export default gql`
    type User {
        id: ID!,
        username: String,
        password: String,
        frameworks: [Framework]
    }

    type Query {
        getUserFrameworks(id: ID!): [Framework],
        getUserById(id: ID!): User,
        getUserByName(name: String!): User
    }

    input UserInput {
        id: ID!,
        username: String,
        password: String
    } 

    type Mutation {
        createUser(user: UserInput!): User!
        deleteUser(user: UserInput!): Boolean
        changePassword(id: ID!, password: String!): Boolean
        # addFramework(id: ID!, narative: FrameworkInput): User
    }
`;