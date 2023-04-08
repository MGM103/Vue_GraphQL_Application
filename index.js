import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import typeDefs from './GraphQLSchema/typeDefs/typeDefs.js';
import resolvers from './GraphQLSchema/resolvers/resolvers.js';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error', error);
  });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
