const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require("graphql");

const { POST } = require("../Model/post");
const { VIDEO } = require("../Model/video");
const { COMMENTS } = require("../Model/comments");
const PostType = require("../Types/Post");
const VideoType = require("../Types/Video");
const CommentType = require("../Types/Comments");

const graphqlQuery = new GraphQLObjectType({
    name: "Query_of_Author",
    fields: {
        showPost: {
            type: new GraphQLList(PostType), // to return list of all data
            async resolve() {
                return await POST.find();
            }
        },

        showVideo: {
            type: new GraphQLList(VideoType),
            async resolve() {
                return await VIDEO.find();
            }
        },

        showComments: {
            type: new GraphQLList(CommentType),
            async resolve() {
                return await COMMENTS.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: GraphQLString },
            },
            async resolve(parent, args) {

                const newPost = new POST({
                    title: args.title,
                    content: args.content
                })

                return await newPost.save();
            }
        },

        addVideo: {
            type: VideoType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                url: { type: GraphQLString },
            },
            async resolve(parent, args) {

                const newVideo = new VIDEO({
                    title: args.title,
                    url: args.url
                })

                return await newVideo.save();
            }
        },

        addComments: {
            type: CommentType,
            args: {
                content: { type: GraphQLString },
                commentId: { type: GraphQLID },
                commentType: { type: GraphQLString },
            },
            async resolve(parent, args) {

                const newComment = new COMMENTS({
                    content: args.content,
                    commentId: args.commentId,
                    commentType: args.commentType
                })

                return await newComment.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: graphqlQuery,
    mutation: Mutation
});