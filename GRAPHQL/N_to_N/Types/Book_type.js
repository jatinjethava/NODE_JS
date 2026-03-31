const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require("graphql");

const { Author } = require("../Model/author");
const { Category } = require("../Model/category");

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => {
        const AuthorType = require("./Author_type");
        const CategoryType = require("./Category_Type");
        return {
            id: { type: GraphQLID },
            Book_Name: { type: GraphQLString },
            Author_Id: { type: GraphQLID },
            author: {
                type: AuthorType,
                async resolve(parent) {
                    return await Author.findById(parent.Author_Id);
                }
            },
            categories: {
                type: new GraphQLList(CategoryType),
                async resolve(parent, args) {
                    return await Category.find({ _id: { $in: parent.categoryIds } })
                }
            }
        }
    }
});

module.exports = BookType;