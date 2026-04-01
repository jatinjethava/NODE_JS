const POST = require("../../Model/post");
const USER = require("../../Model/user");

module.exports = {
    Query: {
        posts: async () => {
            return await POST.find();
        },
        getPost: async (_, { id }) => {
            return await POST.findById(id);
        }
    },
    Mutation: {
        createPost: async (_, args) => {
            const newPost = await POST.create(args);
            return newPost;
        }
    },

    Post: {
        user: async (parent, args) => {
            // 1 to 1
            return await USER.findById(parent.userId);
        }
    }
}