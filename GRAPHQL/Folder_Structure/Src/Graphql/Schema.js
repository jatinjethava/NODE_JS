const userType = require("./Type_Def/userType");
const userResolver = require("./Resolvers/userResolver");

const typeDefs = [userType];
const resolvers = [userResolver];

module.exports = { typeDefs, resolvers };