const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require("graphql");

const { Book } = require("../Model/book");
const { Category } = require("../Model/category");

const CategoryType = new GraphQLObjectType({
    name: "Category",
    fields: () => {
        const Book_Type = require("./Book_type");
        // return {
        //     id: { type: GraphQLID },
        //     Category: { type: GraphQLString },
        //     books: {
        //         type: new GraphQLList(Book_Type),
        //         async resolve(parent, args) {
        //             return await Book.find({ categoryIds: { $in: [parent.id] } })
        //         }
        //     }
        // }
        return {
            id: { type: GraphQLID },
            Category: { type: GraphQLString },
            parentCategory: {
                type: CategoryType,
                async resolve(parent) {
                    if (parent.parentCategory) {
                        return null;
                    }
                    return await Category.findById(parent.parentCategory);
                }
            },
            subCategory: {
                type: new GraphQLList(CategoryType),
                async resolve(parent) {
                    return await Category.find({ parentCategory: parent.id });
                }
            }

        }
    }
});

module.exports = CategoryType;