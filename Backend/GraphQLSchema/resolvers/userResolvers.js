import User from "../../Models/User.js";

const userResolvers = {
  Query: {
    async getUserFrameworks(_, { _id }) {
      try {
        const result = await User.findById(_id);

        if (!result) {
          throw new Error(
            `Frameworks could not be found for User with the Id - ${_id}.`
          );
        }

        return result.frameworks;
      } catch (error) {
        throw new Error(`Query getUserFrameworks failed: ${error.message}`);
      }
    },
    async getUserById(_, { _id }) {
      try {
        const result = await User.findById(_id);

        if (!result) {
          throw new Error(`User with Id: ${_id}, could not be found.`);
        }

        return result;
      } catch (error) {
        throw new Error(`Query getUserById failed: ${error.message}`);
      }
    },
    async getUserByName(_, { name }) {
      try {
        const result = await User.findOne({ username: name });

        if (!result) {
          throw new Error(`User with name: ${name}, could not be found.`);
        }

        return result;
      } catch (error) {
        throw new Error(`Query getUserByName failed: ${error.message}`);
      }
    },
  },
  Mutation: {
    createUser: (_, { user }) => {
      try {
        const result = User.create(user);
        return result;
      } catch (error) {
        throw new Error(`Mutation createUser failed: ${error.message}`);
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        const result = await User.deleteOne({ _id });
        return result.deletedCount === 1;
      } catch (error) {
        throw new Error(`Mutation deleteUser failed: ${error.message}`);
      }
    },
    changePassword: async (_, { _id, password }) => {
      try {
        const result = await User.updateOne({ _id }, { password });
        return result.modifiedCount === 1;
      } catch (error) {
        throw new Error(`Mutation changePassword failed: ${error.message}`);
      }
    },
    addFramework: async (_, { _id, framework }) => {
      try {
        const userData = await User.findById(_id);
        let frameworks = userData.frameworks;

        if (frameworks.includes(framework)) {
          return frameworks;
        }

        frameworks.push(framework);
        const result = await User.updateOne({ _id }, { frameworks });

        return frameworks;
      } catch (error) {
        throw new Error(`Mutation addFramework failed: ${error.message}`);
      }
    },
  },
};

export default userResolvers;
