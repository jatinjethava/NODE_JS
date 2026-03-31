const { gql } = require("apollo-server-express");
// gql is function to write schema in a more readable way, it is a tagged template literal that allows us to write our schema.

const userType = gql`
    type User{
        id: ID!
        name: String!
        email: String!
        mobile_no: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query{
        user: [User]
        getUser(id: ID!): User
    }

    type Mutation{
        createUser(name: String, email: String, mobile_no: String): User
        updateUser(id: ID!, name: String, email: String, mobile_no: String): User
        deleteUser(id: ID!): User
    }
`;
// shema is a blueprint of our data, it defines the structure of our data and how we can query and mutate it.

// ( ! ) its a non-nullable type, it means that the field cannot be null, it must have a value.

module.exports = userType;