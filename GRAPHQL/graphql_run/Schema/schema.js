const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const graphqlQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hellow: {
            type: GraphQLString,
            resolve() {
                return "hellow from graphQl"
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: graphqlQuery
})