const { gql } = require("apollo-server-express");

const PostType = gql`
    type Post{
        id: ID!
        title: String!
        content: String!
        user: User
    }

    extend type Query{
        posts: [Post]
        getPost(id: ID!): Post
    }

    extend type Mutation{
        createPost(userId: ID!, title: String!, content: String!): Post
    }
`;

module.exports = PostType;