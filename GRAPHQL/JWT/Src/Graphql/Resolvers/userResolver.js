const USER = require("../../Model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userResolver = {
    Query: {
        users: async () => {
            return await USER.find().select('-password').sort({ createdAt: -1 });
        },
        getUser: async (_, { id }) => {
            return await USER.findById(id).select('-password');
        }
    },
    Mutation: {
        register: async (_, { name, email, password }) => {
            try {
                const existingUser = await USER.findOne({ email });
                if (existingUser) {
                    throw new Error('User already exists');
                }

                const HashPassword = await bcrypt.hash(password, 10);

                const newUser = new USER({ name, email, password: HashPassword });
                await newUser.save();

                const token = jwt.sign({ userId: newUser._id },
                    process.env.SECRET_KEY,
                    { expiresIn: '1h' }
                );

                return {
                    token: token,
                    user: newUser
                };
            } catch (err) {
                throw err;
            }
        },
        login: async (_, { email, password }) => {
            try {
                const user = await USER.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    throw new Error('Invalid credentials');
                }

                const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

                return {
                    token: token,
                    user: user
                };
            } catch (err) {
                throw err;
            }
        },
    }

};

module.exports = userResolver;
