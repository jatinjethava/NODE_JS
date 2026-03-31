const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLNonNull
} = require("graphql");

const { USER } = require("../Model/model");

const User = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        mobile_no: { type: GraphQLString }
    }
});

const inputType = new GraphQLInputObjectType({
    name: "userInput",
    fields: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        mobile_no: { type: GraphQLString },
    }
})

const graphqlQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        AllUser: {
            type: new GraphQLList(User),
            async resolve() {
                return await USER.find();
            }
        },
        user: {
            type: User,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await USER.findById(args.id);
            }
        }
    }
});

const MutationUser = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: User,
            args: {
                input: { type: inputType }
            },
            async resolve(_, { input }) {

                if (!input.name || input.name.length <= 3) {
                    throw new Error("Name Must Be Required");
                }
                if (!input.email || !input.email.includes("@")) {
                    throw new Error("Email Is Require Format");
                }
                if (!input.mobile_no || input.mobile_no.length !== 10) {
                    throw new Error("Mobile Number must be 10 digits");
                }

                const newUser = new USER(input);
                return await newUser.save();
            }
        },

        updateUser: {
            type: User,
            args: {
                input: { type: inputType }
            },
            async resolve(parent, { input }) {

                const exist = await USER.findById(input.id);
                if (!exist) throw new Error("User not found");

                if (!input.name || input.name.length <= 3) {
                    throw new Error("Name Must Be Required");
                }
                if (!input.email || !input.email.includes("@")) {
                    throw new Error("Email Is Require Format");
                }
                if (!input.mobile_no || input.mobile_no.length !== 10) {
                    throw new Error("Mobile Number must be 10 digits");
                }

                return await USER.findByIdAndUpdate(
                    input.id,
                    {
                        name: input.name,
                        email: input.email,
                        mobile_no: input.mobile_no
                    },
                    { new: true }
                );
            }
        },

        deleteUser: {
            type: User,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, { id }) {
                const exist = await USER.findById(id);
                if (!exist) throw new Error("User not found");

                return await USER.findByIdAndDelete(id);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: graphqlQuery,
    mutation: MutationUser
});