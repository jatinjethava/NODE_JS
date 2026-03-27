const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = require("graphql");

const { Author } = require("../Model/author");
const { Book } = require("../Model/book");
const AuthorType = require("../Types/Author_type");
const BookType = require("../Types/Book_type");
const BookPaginationType = require("../Types/Pagination_Type");
const AuthorPaginationType = require("../Types/AuthorPagination");


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
                const limit = 3;
                const page = args.page || 1;
                const offset = (page - 1) * limit;

                const filter = {};
                if (args.Author_Id) filter.Author_Id = args.Author_Id;

                return await Book.find(filter).skip(offset).limit(limit);
            }
        },

        allAuthors: {
            type: AuthorPaginationType, // simple object
            args: {
                page: { type: GraphQLInt },
                Book_Id: { type: GraphQLID }
            },
            async resolve(parent, args) {

                // paginatiopn login
                const limit = Number(1);
                const page = Number(args.page) || 1;
                const offset = (page - 1) * limit;

                const filter = {};
                if (args.Book_Id) filter.Book_Id = args.Book_Id;

                const totalCounts = await Author.countDocuments(filter);
                const totalPage = totalCounts > 0
                    ? Math.ceil(totalCounts / limit)
                    : 1;

                const author = await Author.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(offset)
                    .limit(limit)

                return {
                    author,
                    totalPage,
                    current_page: page,
                    nextPage: page < totalPage,
                    prevPage: page > 1
                };
            }
        },

        allBooks: {
            type: BookPaginationType, // simple object
            args: {
                page: { type: GraphQLInt },
                Author_Id: { type: GraphQLID }
            },
            async resolve(parent, args) {

                // paginatiopn login
                const limit = Number(3);
                const page = Number(args.page) || 1;
                const offset = (page - 1) * limit;

                const filter = {};
                if (args.Author_Id) filter.Author_Id = args.Author_Id;

                const totalCounts = await Book.countDocuments(filter);
                const totalPage = totalCounts > 0
                    ? Math.ceil(totalCounts / limit)
                    : 1;

                const books = await Book.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(offset)
                    .limit(limit)

                return {
                    books,
                    totalPage,
                    current_page: page,
                    nextPage: page < totalPage,
                    prevPage: page > 1
                };
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
                Author_Id: { type: GraphQLID }
            },
            async resolve(_, args) {

                if (!args.Book_Name || args.Book_Name.length <= 3) {
                    throw new Error("Book_Name Must Be Required");
                }

                const newBook = new Book({
                    Book_Name: args.Book_Name,
                    Author_Id: args.Author_Id
                });
                return await newBook.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: graphqlQuery,
    mutation: Mutation
});