const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
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
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                mobile_no: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const newUser = new USER(args);
                return await newUser.save();
            }
        },

        updateUser: {
            type: User,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                mobile_no: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const exist = await USER.findById(args.id);
                if (!exist) throw new Error("User not found");

                return await USER.findByIdAndUpdate(
                    args.id,
                    {
                        name: args.name,
                        email: args.email,
                        mobile_no: args.mobile_no
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
            async resolve(parent, args) {
                const exist = await USER.findById(args.id);
                if (!exist) throw new Error("User not found");

                return await USER.findByIdAndDelete(args.id);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: graphqlQuery,
    mutation: MutationUser
});