import gql from "graphql-tag";
import { initTestDb, shutDownTestDb } from "./test-utils/testDb";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";
import resolver from "../GraphQLSchema/resolvers/resolvers";
import typeDef from "../GraphQLSchema/typeDefs/typeDefs";

describe("Test User Queries", () => {
  // global test mongodb instance
  let database;
  let schema;
  const mockUser = {
    username: "Y.T.",
    password: "HiroProtagonist",
    frameworks: ["6433e23d447b87fd52a6c805"],
  };

  // Create & connect to test instance of mongodb
  // Then add mock data & create schema
  beforeAll(async () => {
    database = await initTestDb();
    await database.collection("users").insertOne(mockUser);
    schema = makeExecutableSchema({ typeDefs: typeDef, resolvers: resolver });
  });

  // Destroy test instance of mongodb
  afterAll(async () => {
    await shutDownTestDb();
  });

  test("Test get user by id", async () => {
    const queryVars = { id: mockUser._id.toString() };
    const query = gql`
      query GetUserById($id: ID!) {
        getUserById(_id: $id) {
          _id
          username
          password
          frameworks
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query.loc.source.body,
      contextValue: { database },
      variableValues: queryVars,
    });

    expect(result.data.getUserById._id).toEqual(mockUser._id.toString());
    expect(result.data.getUserById.username).toEqual(mockUser.username);
    expect(result.data.getUserById.password).toEqual(mockUser.password);
    expect(result.data.getUserById.frameworks).toEqual(mockUser.frameworks);
  });

  test("Test get user by id error cases", async () => {
    const queryVars = { id: "9688e4b3447b87fd52a6c80c" };
    const query = gql`
      query GetUserById($id: ID!) {
        getUserById(_id: $id) {
          _id
          username
          password
          frameworks
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query.loc.source.body,
      contextValue: { database },
      variableValues: queryVars,
    });

    expect(result.errors[0].message).toEqual(
      `Query getUserById failed: User with Id: ${queryVars.id}, could not be found.`
    );
  });

  test("Get user by name", async () => {
    const queryVars = { username: mockUser.username };
    const query = gql`
      query GetUserByName($username: String!) {
        getUserByName(name: $username) {
          _id
          username
          password
          frameworks
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query.loc.source.body,
      contextValue: { database },
      variableValues: queryVars,
    });

    expect(result.data.getUserByName._id).toEqual(mockUser._id.toString());
    expect(result.data.getUserByName.username).toEqual(mockUser.username);
    expect(result.data.getUserByName.password).toEqual(mockUser.password);
    expect(result.data.getUserByName.frameworks).toEqual(mockUser.frameworks);
  });

  test("Get user by name", async () => {
    const queryVars = { username: "RektDegen" };
    const query = gql`
      query GetUserByName($username: String!) {
        getUserByName(name: $username) {
          _id
          username
          password
          frameworks
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query.loc.source.body,
      contextValue: { database },
      variableValues: queryVars,
    });

    expect(result.errors[0].message).toEqual(
      `Query getUserByName failed: User with name: ${queryVars.username}, could not be found.`
    );
  });

  test("Get user frameworks", async () => {
    const queryVars = { id: mockUser._id.toString() };
    const query = gql`
      query GetUserFrameworks($id: ID!) {
        getUserFrameworks(_id: $id)
      }
    `;

    const result = await graphql({
      schema,
      source: query.loc.source.body,
      contextValue: { database },
      variableValues: queryVars,
    });

    expect(result.data.getUserFrameworks).toEqual(mockUser.frameworks);
  });

  test("Test get user frameworks error cases", async () => {
    const queryVars = { id: "9688e4b3447b87fd52a6c80c" };
    const query = gql`
      query GetUserFrameworks($id: ID!) {
        getUserFrameworks(_id: $id)
      }
    `;

    const result = await graphql({
      schema,
      source: query.loc.source.body,
      contextValue: { database },
      variableValues: queryVars,
    });

    expect(result.errors[0].message).toEqual(
      "Query getUserFrameworks failed: Frameworks could not be found for User with the Id - 9688e4b3447b87fd52a6c80c."
    );
  });
});
