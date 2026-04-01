const { gql } = require('apollo-server-express');

const userTypeDef = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        users: [User]
        getUser(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, email: String!): User
        updateUser(id: ID!, name: String!, email: String!): User
        deleteUser(id: ID!): User
    }

    type Subscription{
        userCreated: User
    }
`;

module.exports = userTypeDef;
