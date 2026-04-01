const { gql } = require("apollo-server-express");

const UserType = gql`
    type User{
        id: ID!
        name: String!
        email: String!
        post: [Post]
    }

    extend type Query{
        users: [User]
        getUser(id: ID!): User
    }

    extend type Mutation{
        createUser(name: String!, email: String!): User
    }
`;

module.exports = UserType;