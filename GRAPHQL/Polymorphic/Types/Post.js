const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require("graphql");

const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => {
        return {
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            content: { type: GraphQLString }
        }
    }
});

module.exports = PostType;