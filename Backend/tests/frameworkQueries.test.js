import gql from "graphql-tag";
import { initTestDb, shutDownTestDb } from "./test-utils/testDb";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";
import resolver from "../GraphQLSchema/resolvers/resolvers";
import typeDef from "../GraphQLSchema/typeDefs/typeDefs";

describe("Test Framework Queries", () => {
  // global test mongodb instance
  let database;
  let schema;
  const mockFramework = {
    protocol: "Pendle",
    naratives: ["6433e4b3447b87fd52a6c80b"],
    competitors: ["IPOR", "VOLTZ"],
    thesis: `Interest rate swaps make up the largest segment of the trillion dollar derivitives market of TradFi. 
    Additionally there are numerous interest rates provided by the explosion of LSDs and 
    interest rate swaps provide means of longing and shorting different these different products`,
    bullcase:
      "The growing number of LSDs and GMX forks catalyse an interest rate swap market and pendle continues to grow",
    bearcase:
      "This product is too complex for the average user it never gains traction. Alternatively one of the competitors takes most of the market share",
    acquisitionStrat: "DCA sub 45 cents",
    exitConditions:
      "Exploit or the number of users using interest rate swaps on competitors grows faster for at a sustained period (3 months) period",
    user: "6433e23d447b87fd52a6c805",
  };

  // Create & connect to test instance of mongodb
  // Then add mock data & create schema
  beforeAll(async () => {
    database = await initTestDb();
    await database.collection("frameworks").insertOne(mockFramework);
    schema = makeExecutableSchema({ typeDefs: typeDef, resolvers: resolver });
  });

  // Destroy test instance of mongodb
  afterAll(async () => {
    await shutDownTestDb();
  });

  test("Test get framework by id", async () => {
    const queryVars = { id: mockFramework._id.toString() };
    const query = gql`
      query GetFramework($id: ID!) {
        getFrameworkById(_id: $id) {
          _id
          protocol
          naratives
          competitors
          thesis
          bullcase
          bearcase
          acquisitionStrat
          exitConditions
          user
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query.loc.source.body,
      contextValue: { database },
      variableValues: queryVars,
    });

    expect(result.data.getFrameworkById._id).toEqual(
      mockFramework._id.toString()
    );
    expect(result.data.getFrameworkById.protocol).toEqual(
      mockFramework.protocol
    );
    expect(result.data.getFrameworkById.thesis).toEqual(mockFramework.thesis);
    expect(result.data.getFrameworkById.competitors).toEqual(
      mockFramework.competitors
    );
    expect(result.data.getFrameworkById.naratives).toEqual(
      mockFramework.naratives
    );
    expect(result.data.getFrameworkById.bullcase).toEqual(
      mockFramework.bullcase
    );
    expect(result.data.getFrameworkById.bearcase).toEqual(
      mockFramework.bearcase
    );
    expect(result.data.getFrameworkById.acquisitionStrat).toEqual(
      mockFramework.acquisitionStrat
    );
    expect(result.data.getFrameworkById.exitConditions).toEqual(
      mockFramework.exitConditions
    );
    expect(result.data.getFrameworkById.user).toEqual(mockFramework.user);
  });

  test("Test get framework by id error cases", async () => {
    const queryVars = { id: "9688e4b3447b87fd52a6c80c" };
    const query = gql`
      query GetFramework($id: ID!) {
        getFrameworkById(_id: $id) {
          _id
          protocol
          naratives
          competitors
          thesis
          bullcase
          bearcase
          acquisitionStrat
          exitConditions
          user
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
      `Query getFrameworkById failed: Framework with id: ${queryVars.id}, could not be found.`
    );
  });
});
