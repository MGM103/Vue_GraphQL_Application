import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './userTypeDef';
import frameworkTypeDefs from './frameworkTypeDef';
import narativeTypeDefs from './narativeTypeDef';

const typeDefs = [
  userTypeDefs,
  frameworkTypeDefs,
  narativeTypeDefs
  // Add any other type definition files here
];

export default mergeTypeDefs(typeDefs);
