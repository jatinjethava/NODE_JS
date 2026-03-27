const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} = require("graphql");

const AuthorPaginationType = new GraphQLObjectType({
    name: "AuthorPagination",
    fields: () => {
        const AuthorType = require("./Author_type");
        return {
            author: { type: new GraphQLList(AuthorType) },
            totalPage: { type: GraphQLInt },
            current_page: { type: GraphQLInt },
            nextPage: { type: GraphQLBoolean },
            prevPage: { type: GraphQLBoolean },
        }
    }
});

module.exports = AuthorPaginationType;