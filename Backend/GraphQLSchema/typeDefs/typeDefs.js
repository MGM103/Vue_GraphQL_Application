import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './userTypeDef.js';
import frameworkTypeDefs from './frameworkTypeDef.js';
import narativeTypeDefs from './narativeTypeDef.js';

const typeDefs = [
  userTypeDefs,
  frameworkTypeDefs,
  narativeTypeDefs
  // Add any other type definition files here
];

export default mergeTypeDefs(typeDefs);
