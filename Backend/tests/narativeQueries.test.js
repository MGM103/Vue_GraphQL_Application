import gql from 'graphql-tag';
import { initTestDb, shutDownTestDb } from "./test-utils/testDb";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from "graphql";
import resolver from '../GraphQLSchema/resolvers/resolvers';
import typeDef from '../GraphQLSchema/typeDefs/typeDefs';

// global test mongodb instance
let database;
let schema;
const mockNarative = {
  name: "NFT-Fi",
  description: "Unlocking the economic power of notable NFT collections by providing lending, CDPs, perps, etc."
};

// Create & connect to test instance of mongodb
// Then add mock data
// Then create schema
beforeAll(async () => {
    database = await initTestDb();
    await database.collection('naratives').insertOne(mockNarative);
    schema = makeExecutableSchema({typeDefs: typeDef, resolvers: resolver});
});

// Destroy test instance of mongodb
afterAll(async () => {
    await shutDownTestDb();
});

describe("Narative GraphQL tests", () => {
  test("Get Narative by name", async () => {
    // create graphql query
    const queryVars = {name: mockNarative.name};
    const query = gql`
      query testGetNarativeByName($name: String!){
        getNarativeByName(name: $name) {
          name,
          description,
          _id
        }
      }
    `;

    // execute query against test schema
    const result = await graphql({
      schema, 
      source: query.loc.source.body,
      contextValue: { database },
      variableValues: queryVars
    });

    expect(result.data.getNarativeByName.name).toEqual(mockNarative.name);
    expect(result.data.getNarativeByName.description).toEqual(mockNarative.description);
    expect(result.data.getNarativeByName._id).toEqual(mockNarative._id.toString());
  });

  test("Get Narative by id", async () => {
    const queryVars = {id: mockNarative._id.toString()};
    const query = gql`
      query testGetNarativeById($id: ID!) {
        getNarativeById(_id: $id) {
          _id,
          name,
          description
        }
      }
    `;

    const result = await graphql({
      schema, 
      source: query.loc.source.body,
      contextValue: { database },
      variableValues: queryVars
    });

    console.log(JSON.stringify(result));
    
    expect(result.data.getNarativeById.name).toEqual(mockNarative.name);
    expect(result.data.getNarativeById.description).toEqual(mockNarative.description);
    expect(result.data.getNarativeById._id).toEqual(mockNarative._id.toString());
  });
});
