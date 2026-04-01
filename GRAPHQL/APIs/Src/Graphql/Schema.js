const { makeExecutableSchema } = require('@graphql-tools/schema');
const { gql } = require('apollo-server-express');

const userTypeDef = require('./TypeDefs/userType');
const postTypeDef = require("./TypeDefs/postType");

const userResolver = require('./Resolvers/user');
const postResolver = require("./Resolvers/post");

const baseTypeDef = gql`
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [baseTypeDef, userTypeDef, postTypeDef],
    resolvers: [userResolver, postResolver]
});

module.exports = schema;
