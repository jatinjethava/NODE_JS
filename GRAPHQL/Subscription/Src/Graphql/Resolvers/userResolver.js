const SUBSCRIPTION = require("../../Model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pubSub = require("../../pubSub");

const USER = "USER_ADD";

const userResolver = {
    Query: {
        users: async (_, __) => {
            return await SUBSCRIPTION.find().sort({ createdAt: -1 });
        },
        getUser: async (_, { id }) => {
            return await SUBSCRIPTION.findById(id);
        }
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            try {
                const existingUser = await SUBSCRIPTION.findOne({ email });
                if (existingUser) {
                    throw new Error('User already exists');
                }

                const newUser = new SUBSCRIPTION({
                    name,
                    email
                })
                await newUser.save();

                await pubSub.publish(USER, { userCreated: newUser });

                return newUser;
            } catch (err) {
                throw err;
            }
        }
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubSub.asyncIterableIterator([USER])
        }
    }

};

module.exports = userResolver;
