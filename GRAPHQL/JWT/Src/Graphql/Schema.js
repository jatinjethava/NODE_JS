const { makeExecutableSchema } = require('@graphql-tools/schema');
const userTypeDef = require('./TypeDefs/userTypeDef');
const userResolver = require('./Resolvers/userResolver');

const schema = makeExecutableSchema({
    typeDefs: [userTypeDef],
    resolvers: [userResolver]
});

module.exports = schema;
