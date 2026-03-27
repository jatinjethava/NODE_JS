const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require("graphql");

const { Book } = require("../Model/book")

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => {
        const BookType = require("./Book_type");
        return {
            id: { type: GraphQLID },
            Author_Name: { type: GraphQLString },
            books: {
                type: new GraphQLList(BookType),
                async resolve(parent) {
                    return await Book.find({ Author_Id: parent.id });
                }
            }
        }
    }
});

module.exports = AuthorType;