import gql from 'graphql-tag';
import { initTestDb, shutDownTestDb } from "./test-utils/testDb";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from "graphql";
import resolver from '../GraphQLSchema/resolvers/resolvers';
import typeDef from '../GraphQLSchema/typeDefs/typeDefs';

describe("Test Narative Queries", () => {
  // global test mongodb instance
  let database;
  let schema;
  const mockNarative = {
    name: "NFT-Fi",
    description: "Unlocking the economic power of notable NFT collections by providing lending, CDPs, perps, etc."
  };
  
  // Create & connect to test instance of mongodb
  // Then add mock data & create schema
  beforeAll(async () => {
    database = await initTestDb();
    await database.collection('naratives').insertOne(mockNarative);
    schema = makeExecutableSchema({typeDefs: typeDef, resolvers: resolver});
  });

  // Destroy test instance of mongodb
  afterAll(async () => {
    await shutDownTestDb();
  });

  test("Test create Narative", async () => {
    // create graphql mutation
    const mutationVars = {narative: {name: "Ve(3,3)", description: "Andre Cronje's invention for a sustainable incentive system to promote the growth of a DEX. Borrows from Curve (Ve) and OlympusDAO (3,3)"}};
    const mutation = gql`
      mutation TestCreateNarative($narative: NarativeInput!){
        createNarative(narative: $narative) {
          name,
          description,
          _id
        }
      }
    `;

    // execute mutation against test schema
    const result = await graphql({
      schema, 
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars
    });

    expect(result.data.createNarative.name).toEqual(mutationVars.narative.name);
    expect(result.data.createNarative.description).toEqual(mutationVars.narative.description);
  });

  test("Test edit Narative", async () => {
    // create graphql mutation
    const mutationVars = {id: mockNarative._id.toString(), narative: {name: "Ve(3,3)", description: "Andre Cronje's invention for a sustainable incentive system to promote the growth of a DEX. Borrows from Curve (Ve) and OlympusDAO (3,3)"}};
    const mutation = gql`
      mutation TestEditNarative($id: ID!, $narative: NarativeInput!){
        editNarative(_id:$id, newNarative: $narative) {
          name,
          description,
          _id
        }
      }
    `;

    // execute mutation against test schema
    const result = await graphql({
      schema, 
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars
    });

    expect(result.data.editNarative.name).toEqual(mutationVars.narative.name);
    expect(result.data.editNarative.description).toEqual(mutationVars.narative.description);
    expect(result.data.editNarative._id).toEqual(mockNarative._id.toString());
  });

  test("Test delete Narative", async () => {
    // Create graphQL mutation
    const mutationVars = {id: mockNarative._id.toString()};
    const mutation = gql`
      mutation TestDeleteNarative($id: ID!) {
        deleteNarative(_id: $id)
      }
    `;

    // execute mutation against test schema
    const result = await graphql({
      schema, 
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars
    });

    expect(result.data.deleteNarative).toEqual(true);
  });

});