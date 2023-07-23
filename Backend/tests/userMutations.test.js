import gql from "graphql-tag";
import { initTestDb, shutDownTestDb } from "./test-utils/testDb";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";
import resolver from "../GraphQLSchema/resolvers/resolvers";
import typeDef from "../GraphQLSchema/typeDefs/typeDefs";

describe("Test Narative Queries", () => {
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

  test("Test create User", async () => {
    // create graphql mutation
    const mutationVars = {
      user: {
        username: "NGMI",
        password: "W@GMI",
        frameworks: ["6433e23d447b87fd52a6f456"],
      },
    };
    const mutation = gql`
      mutation TestCreateUser($user: UserInput!) {
        createUser(user: $user) {
          _id
          password
          username
          frameworks
        }
      }
    `;

    // execute mutation against test schema
    const result = await graphql({
      schema,
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars,
    });

    expect(result.data.createUser.username).toEqual(mutationVars.user.username);
    expect(result.data.createUser.password).toEqual(mutationVars.user.password);
    expect(result.data.createUser.frameworks).toEqual(
      mutationVars.user.frameworks
    );
  });

  test("Test change User password", async () => {
    // create graphQL mutation
    const mutationVars = {
      id: mockUser._id.toString(),
      password: "P@ssword123",
    };
    const mutation = gql`
      mutation TestChangePassword($id: ID!, $password: String!) {
        changePassword(_id: $id, password: $password)
      }
    `;

    // execute mutation against test schema
    const result = await graphql({
      schema,
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars,
    });

    const userData = await database
      .collection("users")
      .findOne({ _id: mockUser._id });

    expect(result.data.changePassword).toBe(true);
    expect(userData.password).toEqual(mutationVars.password);
  });

  test("Test add framework", async () => {
    // create graphQL mutation
    const mutationVars = {
      id: mockUser._id.toString(),
      framework: "6433e3d6447b87fd52a6c807",
    };
    const mutation = gql`
      mutation TestAddFramework($id: ID!, $framework: ID!) {
        addFramework(_id: $id, framework: $framework)
      }
    `;

    // execute mutation against test schema
    const result = await graphql({
      schema,
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars,
    });

    expect(result.data.addFramework.includes(mutationVars.framework)).toBe(
      true
    );
  });

  test("Test delete User", async () => {
    //create graphQL mutation
    const mutationVars = { id: mockUser._id.toString() };
    const mutation = gql`
      mutation TestDeleteUser($id: ID!) {
        deleteUser(_id: $id)
      }
    `;

    // execute mutation against test schema
    const result = await graphql({
      schema,
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars,
    });

    expect(result.data.deleteUser).toBe(true);
  });
});
