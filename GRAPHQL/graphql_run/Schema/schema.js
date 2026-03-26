const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = require("graphql");

const user = [
    { id: 1, name: "jatin jethava", email: "jatin@gmail.com" },
    { id: 2, name: "yashdip jethava", email: "yashdip@gmail.com" }
]

const User = new GraphQLObjectType({
    name: "userData",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    }
})

const graphqlQuery = new GraphQLObjectType({
    name: 'GraphqlQuery', // get api in rest
    fields: {
        user: {
            type: User,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {

                return user.find(user => user.id == args.id);
            }
        }
    }
})

// mutetion example
const MutetionUser = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: User,
            args: {
                id: { type: GraphQLInt },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(perent, args) {
                const data = {
                    id: user.length + 1 + "",
                    name: args.name,
                    email: args.email
                }

                user.push(data);
                return data;
            }
        },
        updateUser: {
            type: User,
            args: {
                id: { type: GraphQLInt },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(perent, args) {

                const userId = user.find(user => user.id == args.id);
                if (userId) {

                    userId.name = args.name || user.name,
                        userId.email = args.email || user.email

                    console.log(userId);
                    return userId;
                }
                throw new Error("User not found");
            }
        },
        deleteUser: {
            type: User,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(perent, args) {

                const index = user.findIndex(user => user.id == args.id);
                if (index === -1) throw new Error("User not found");
                return user.splice(index, 1)[0];
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: graphqlQuery,
    mutation: MutetionUser
})