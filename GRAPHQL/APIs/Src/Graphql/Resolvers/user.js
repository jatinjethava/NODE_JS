const POST = require("../../Model/post");
const USER = require("../../Model/user");

module.exports = {
    Query: {
        users: async () => {
            return await USER.find();
        },
        getUser: async (_, { id }) => {
            const cleanId = id.replace(/[^a-f0-9]/gi, '');
            return await USER.findById(cleanId);
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            const newUser = await USER.create(args);
            return newUser;
        }
    },

    User: {
        post: async (parent, args) => {
            // 1 to N
            return await POST.find({ userId: parent._id });
        }
    }
}