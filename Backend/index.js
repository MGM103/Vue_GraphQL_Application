import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

// GraphQL file imports
import typeDefs from "./GraphQLSchema/typeDefs/typeDefs.js";
import resolvers from "./GraphQLSchema/resolvers/resolvers.js";

// env file imports & setup
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Retrieving env variables to connect to mongodb
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// GraphQL server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connect db to server
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
  });

// Create server
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
