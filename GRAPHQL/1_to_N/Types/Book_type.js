const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = require("graphql");

const { Author } = require("../Model/author");
// const AuthorType = require("./Author_type");
// at the same time load this file in both Book_type and Author_type files thats why
// One of the provided types for building the Schema is missing a name. this error occure

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => {
        const AuthorType = require("./Author_type");
        return {
            id: { type: GraphQLID },
            Book_Name: { type: GraphQLString },
            Author_Id: { type: GraphQLID },
            author: {
                type: AuthorType,
                async resolve(parent) {
                    return await Author.findById(parent.Author_Id);
                }
            }
        }
    }
});

module.exports = BookType;