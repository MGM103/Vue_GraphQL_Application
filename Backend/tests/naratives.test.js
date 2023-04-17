import gql from 'graphql-tag';
import { initTestDb, shutDownTestDb } from "./test-utils/testDb";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from "graphql";
import resolver from '../GraphQLSchema/resolvers/resolvers';
import typeDef from '../GraphQLSchema/typeDefs/typeDefs';

// global test mongodb instance
let database;

// Create & connect to test instance of mongodb
beforeAll(async () => {
    database = await initTestDb();
});

// Destroy test instance of mongodb
afterAll(async () => {
    await shutDownTestDb();
});

describe("Narative GraphQL tests", () => {
  test("Get Narrative by name", async () => {
    const mockNarative = {
      name: "NFT-Fi",
      description: "Unlocking the economic power of notable NFT collections by providing lending, CDPs, perps, etc."
    };

    // insert mock data into test db
    await database.collection('naratives').insertOne(mockNarative);
    const prep = await database.collection('naratives').findOne({name: "NFT-Fi"});
    expect(prep).toEqual(mockNarative);

    // create graphql test schema & query & execute query
    const schema = makeExecutableSchema({typeDefs: typeDef, resolvers: resolver});
    const query = gql`
      query{
        getNarativeByName(name: "NFT-Fi") {
          name,
          description,
          _id
        }
      }
    `;
    const result = await graphql({
      schema, 
      source: query.loc.source.body,
      contextValue: { database }
    });

    expect(result.data.getNarativeByName.name).toEqual(mockNarative.name);
    expect(result.data.getNarativeByName.description).toEqual(mockNarative.description);
    expect(result.data.getNarativeByName._id).toEqual(mockNarative._id.toString());
  });
});
