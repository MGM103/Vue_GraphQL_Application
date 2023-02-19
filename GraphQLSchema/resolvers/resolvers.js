import { mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './userResolvers.js';
import narativeResolvers from './narativeResolvers.js';
import frameworkResolvers from './frameworkResolvers.js';


const resolvers = mergeResolvers([
  userResolvers,
  narativeResolvers,
  frameworkResolvers
  // ... add other resolvers as needed
]);

export default resolvers;

