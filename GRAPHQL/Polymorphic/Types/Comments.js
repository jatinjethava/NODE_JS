const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLUnionType
} = require("graphql");

const { POST } = require("../Model/post");
const { VIDEO } = require("../Model/video");

const PostType = require("../Types/Post");
const VideoType = require("../Types/Video");

const commentableType = new GraphQLUnionType({
    name: "commentableData",
    types: [PostType, VideoType],
    resolveType: (value) => {
        if (value.url) return VideoType;
        if (value.title) return PostType;
        return null;
    }
})

const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => {
        return {
            id: { type: GraphQLID },
            content: { type: GraphQLString },
            commentId: { type: GraphQLID },
            commentType: { type: GraphQLString },
            commentableData: {
                type: commentableType,
                async resolve(parent) {
                    if (!parent.commentId) return null;

                    if (parent.commentType === "Post") {
                        return await POST.findById(parent.commentId);
                    }

                    if (parent.commentType === "Video") {
                        return await VIDEO.findById(parent.commentId);
                    }

                    return null;
                }
            }
        }
    }
});

module.exports = CommentType;