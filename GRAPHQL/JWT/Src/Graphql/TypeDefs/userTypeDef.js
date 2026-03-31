const { gql } = require('apollo-server-express');

const userTypeDef = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        createdAt: String!
        updatedAt: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        users: [User]
        getUser(id: ID!): User
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        updateUser(id: ID!, name: String!, email: String!): User
        deleteUser(id: ID!): User
    }
`;

module.exports = userTypeDef;
