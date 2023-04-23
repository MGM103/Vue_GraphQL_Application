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
  const mockFramework = {
    protocol: "Pendle",
    naratives: ["6433e4b3447b87fd52a6c80b"],
    competitors: ["IPOR", "VOLTZ"],
    thesis: `Interest rate swaps make up the largest segment of the trillion dollar derivitives market of TradFi. 
    Additionally there are numerous interest rates provided by the explosion of LSDs and 
    interest rate swaps provide means of longing and shorting different these different products`,
    bullcase: "The growing number of LSDs and GMX forks catalyse an interest rate swap market and pendle continues to grow",
    bearcase: "This product is too complex for the average user it never gains traction. Alternatively one of the competitors takes most of the market share",
    acquisitionStrat: "DCA sub 45 cents",
    exitConditions: "Exploit or the number of users using interest rate swaps on competitors grows faster for at a sustained period (3 months) period",
    user: "6433e23d447b87fd52a6c805"
  };

  // Create & connect to test instance of mongodb
  // Then add mock data & create schema
  beforeAll(async () => {
    database = await initTestDb();
    await database.collection('frameworks').insertOne(mockFramework);
    schema = makeExecutableSchema({typeDefs: typeDef, resolvers: resolver});
  });

  // Destroy test instance of mongodb
  afterAll(async () => {
    await shutDownTestDb();
  });

  test("Test create Framework", async () => {
    // create graphql mutation
    const mutationVars = {
      framework: {
        protocol: "Redacted",
        thesis: "Create new novel products that have gained PMV, bribes will go up over time which this captures and they are joining the stable coin and LSD narative.",
        user: "6433e23d447b87fd52a6f456",
        naratives: ["6433e4b3447b87fd52a6c80b", "6433e4b3447b87fd52b2d80b"],
        bullcase: "Dinero launch goes well, bribes continue to go up",
        bearcase: "While the products are interesting and novel they do not capture new users as the space continues to grow, due to either competitors stealing market share or the complexity of the products themselves.",
        competitors: [],
        acquisitionStrat: "DCA below $250",
        exitConditions: "Exploit or stagnat user growth during next bull.",
      }
    };
    const mutation = gql`
      mutation TestCreateFramework($framework: FrameworkInput!) {
        createFramework(framework: $framework) {
          _id,
          acquisitionStrat,
          bearcase,
          bullcase,
          competitors,
          exitConditions,
          naratives,
          protocol,
          thesis,
          user
        }
      }
    `;

    // execute mutation
    const result = await graphql({
      schema, 
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars
    });

    expect(result.data.createFramework.protocol).toEqual(mutationVars.framework.protocol);
    expect(result.data.createFramework.user).toEqual(mutationVars.framework.user);
    expect(result.data.createFramework.thesis).toEqual(mutationVars.framework.thesis);
    expect(result.data.createFramework.bullcase).toEqual(mutationVars.framework.bullcase);
    expect(result.data.createFramework.bearcase).toEqual(mutationVars.framework.bearcase);
    expect(result.data.createFramework.acquisitionStrat).toEqual(mutationVars.framework.acquisitionStrat);
    expect(result.data.createFramework.competitors).toEqual(mutationVars.framework.competitors);
    expect(result.data.createFramework.exitConditions).toEqual(mutationVars.framework.exitConditions);
    expect(result.data.createFramework.naratives).toEqual(mutationVars.framework.naratives);
  });

  test("Test edit Framework", async () => {
    // Create mutation
    const mutationVars = {
      id: mockFramework._id.toString(),
      framework: {
        acquisitionStrat: "DCA below $250 and use yield from locked btrfly to buy more",
        bearcase: "Dinero doesn't gain adoption and priority gas currency doesn't gain traction. Bribes don't flow to hidden hand & pirex usage diminishes.",
        protocol: mockFramework.protocol,
        user: mockFramework.user
      }
    };
    const mutation = gql`
      mutation TestEditFramework($id: ID!, $framework: FrameworkInput!) {
        editFramework(_id: $id, newFramework: $framework) {
          acquisitionStrat
          bearcase
          bullcase
          competitors
          naratives
          exitConditions
          protocol
          thesis
          user
        }
      }
    `;

    // Execute mutation
    const result = await graphql({
      schema, 
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars
    });

    expect(result.data.editFramework.protocol).toEqual(mockFramework.protocol);
    expect(result.data.editFramework.user).toEqual(mockFramework.user);
    expect(result.data.editFramework.thesis).toEqual(mockFramework.thesis);
    expect(result.data.editFramework.bullcase).toEqual(mockFramework.bullcase);
    expect(result.data.editFramework.bearcase).toEqual(mutationVars.framework.bearcase);
    expect(result.data.editFramework.acquisitionStrat).toEqual(mutationVars.framework.acquisitionStrat);
    expect(result.data.editFramework.competitors).toEqual(mockFramework.competitors);
    expect(result.data.editFramework.exitConditions).toEqual(mockFramework.exitConditions);
    expect(result.data.editFramework.naratives).toEqual(mockFramework.naratives);
  });

  test("Test add Framework Narative", async () => {
    // Create mutation
    const mutationVars = {frameworkId: mockFramework._id.toString(), narativeId: "6433e4b3447b87fd52a6c80c"};
    const mutation = gql`
      mutation TestAddFrameworkNarative($frameworkId: ID!, $narativeId: ID!) {
        addFrameworkNarative(_id: $frameworkId, narative: $narativeId)
      }
    `;

    // execute mutation
    const result = await graphql({
      schema, 
      source: mutation.loc.source.body,
      contextValue: { database },
      variableValues: mutationVars
    });

    const naratives = result.data.addFrameworkNarative;

    expect(naratives.includes(mutationVars.narativeId)).toBe(true);
  });

  test("Test delete Framework", async () => {
    // Setup User to test Framework deletion propogation
    const mockUser = {
      username: "Y.T.",
      password: "HiroProtagonist",
      frameworks: []
    };
    await database.collection('users').insertOne(mockUser);
    const mutationVarsUser = {id: mockUser._id.toString(), framework: mockFramework._id.toString()};
    const mutationUser = gql`
      mutation TestAddFramework($id: ID!, $framework: ID!) {
        addFramework(_id: $id, framework: $framework)
      }
    `;

    // Add mock framework to the user's frameworks
    const resultUser = await graphql({
      schema, 
      source: mutationUser.loc.source.body,
      contextValue: { database },
      variableValues: mutationVarsUser
    });

    // Create deletion mutation
    const mutationVarsDelete = {id: mockFramework._id.toString()};
    const mutationDelete = gql`
      mutation TestDeleteFramework($id: ID!) {
        deleteFramework(_id: $id)
      }
    `;

    // Execute mutation
    const resultDelete = await graphql({
      schema, 
      source: mutationDelete.loc.source.body,
      contextValue: { database },
      variableValues: mutationVarsDelete
    });

    expect(resultDelete.data.deleteFramework).toBe(true);
    expect(mockUser.frameworks).toEqual([]);
  });
});