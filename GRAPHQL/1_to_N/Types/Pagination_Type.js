const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} = require("graphql");

const BookPaginationType = new GraphQLObjectType({
    name: "Pagination",
    fields: () => {
        const BookType = require("./Book_type");
        return {
            books: { type: new GraphQLList(BookType) },
            totalPage: { type: GraphQLInt },
            current_page: { type: GraphQLInt },
            nextPage: { type: GraphQLBoolean },
            prevPage: { type: GraphQLBoolean },
        }
    }
});

module.exports = BookPaginationType;