import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectToDatabase from "./DB/connectToDb.js";
import { typeDefs } from "./GraphQL Schema/graphQL_Schema.js";
import { createUser, getUser, loginUser } from "./Resolvers/userResolvers.js";
import { createPost, deleteMyPost, getAllPosts, getMyPosts, getSingleRequestedPost, updateMyPosts } from "./Resolvers/postResolvers.js";
import dotenv from "dotenv";

dotenv.config();
const resolvers = {
  Query: {
    // Get all posts Resolver
    getAllPosts: getAllPosts,
    
    // Get my posts Resolver
    getMyPosts: getMyPosts,

    // Get single requested post
    getSingleRequestedPost: getSingleRequestedPost,

    // Get user details Resolver
    getUser: getUser,
  },

  Mutation: {
    // Post Creation Resolver
    createPost: createPost,

    // Post Update Resolver
    updateMyPost: updateMyPosts,

    // Post Delete Resolver
    deleteMyPost: deleteMyPost,

    // User Creation Resolver
    createUser: createUser,

    // User Login Resolver
    loginUser: loginUser,
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServerAndDb() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
    context: async ({ req }) => {
      return req.headers;
    }
  });
  await connectToDatabase(process.env.MONGO_URI);
  console.log(`🚀 Server ready at ${url}`);
}

startServerAndDb();