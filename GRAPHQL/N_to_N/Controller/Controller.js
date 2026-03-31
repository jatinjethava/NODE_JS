const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require("graphql");

const { Author } = require("../Model/author");
const { Book } = require("../Model/book");
const { Category } = require("../Model/category");
const AuthorType = require("../Types/Author_type");
const BookType = require("../Types/Book_type");
const CategoryType = require("../Types/Category_Type");


const graphqlQuery = new GraphQLObjectType({
    name: "Query_of_Author",
    fields: {
        AllAuthor: {
            type: new GraphQLList(AuthorType),
            async resolve() {
                return await Author.find();
            }
        },
        AllBook: {
            type: new GraphQLList(BookType),
            args: {
                page: { type: GraphQLInt },
                Author_Id: { type: GraphQLID }
            },
            async resolve(parent, args) {

                // paginatiopn login
                const limit = 5;
                const page = args.page || 1;
                const offset = (page - 1) * limit;

                const filter = {};
                if (args.Author_Id) filter.Author_Id = args.Author_Id;

                return await Book.find(filter).skip(offset).limit(limit);
            }
        },

        Category: {
            type: CategoryType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                return await Category.findById(args.id);
            }
        },

        Categories: {
            type: new GraphQLList(CategoryType),
            async resolve() {
                return await Category.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                Author_Name: { type: GraphQLString }
            },
            async resolve(_, args) {

                if (!args.Author_Name || args.Author_Name.length <= 3) {
                    throw new Error("Name Must Be Required");
                }

                const newAuthor = new Author({ Author_Name: args.Author_Name });
                return await newAuthor.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                Book_Name: { type: GraphQLString },
                Author_Id: { type: GraphQLID },
                categoryIds: { type: new GraphQLList(GraphQLID) }
            },
            async resolve(_, args) {

                if (!args.Book_Name || args.Book_Name.length <= 3) {
                    throw new Error("Book_Name Must Be Required");
                }

                const newBook = new Book({
                    Book_Name: args.Book_Name,
                    Author_Id: args.Author_Id,
                    categoryIds: args.categoryIds
                });
                return await newBook.save();
            }
        },

        addCategory: {
            type: CategoryType,
            args: {
                Category: { type: new GraphQLNonNull(GraphQLString) },
                parentCategory: { type: GraphQLID },
            },
            async resolve(_, args) {
                if (!args.Category || args.Category.length <= 3) {
                    throw new Error("Category Must Be Required");
                }

                const newCategory = new Category({
                    Category: args.Category,
                    parentCategory: args.parentCategory
                });
                return await newCategory.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: graphqlQuery,
    mutation: Mutation
});