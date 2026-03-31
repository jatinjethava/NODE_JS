const USER = require("../../Models/user");

const userResolver = {
    Query: {
        user: async () => {
            try {
                const users = await USER.find().sort({ createdAt: -1 });
                return users;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to fetch users");
            }
        },
        getUser: async (_, { id }) => {
            try {
                const user = await USER.findById(id);
                return user;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to fetch user");
            }
        }
    },
    Mutation: {
        createUser: async (_, { name, email, mobile_no }) => {
            try {

                if (!name || !email || !mobile_no) {
                    throw new Error("All fields are required");
                }
                if (!/^\S+@\S+\.\S+$/.test(email)) {
                    throw new Error("Invalid email format");
                }
                if (!/^\d{10}$/.test(mobile_no)) {
                    throw new Error("Invalid mobile number format");
                }

                const existUser = await USER.findOne({ email });
                if (existUser) {
                    throw new Error("Email already exists");
                }

                const newUser = new USER({ name, email, mobile_no });
                const savedUser = await newUser.save();

                return savedUser;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        updateUser: async (_, { id, name, email, mobile_no }) => {
            try {

                if (!name || !email || !mobile_no) {
                    throw new Error("All fields are required");
                }
                if (!/^\S+@\S+\.\S+$/.test(email)) {
                    throw new Error("Invalid email format");
                }
                if (!/^\d{10}$/.test(mobile_no)) {
                    throw new Error("Invalid mobile number format");
                }

                const existUser = await USER.findOne({ email, _id: { $ne: id } });
                if (existUser) {
                    throw new Error("Email already exists");
                }

                const updatedUser = await USER.findByIdAndUpdate(
                    id,
                    { name, email, mobile_no },
                    { new: true }
                );
                return updatedUser;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        deleteUser: async (_, { id }) => {
            try {
                const deletedUser = await USER.findByIdAndDelete(id);

                if (!deletedUser) {
                    throw new Error("User not found");
                }

                return deletedUser;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    }
};

module.exports = userResolver;
// userResolver is an object that contains the resolver functions for our schema, it has two properties Query and Mutation, each property is an object that contains the resolver functions for the corresponding type in our schema. The resolver functions are responsible for fetching the data for the fields in our schema. The resolver functions take two arguments, the first argument is the parent object, which is the result of the previous resolver function, and the second argument is an object that contains the arguments passed to the field in the query or mutation. In our case, we are not using the parent object, so we can ignore it by using an underscore (_).
