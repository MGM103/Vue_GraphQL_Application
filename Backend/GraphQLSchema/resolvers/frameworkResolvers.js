import Framework from "../../Models/Framework.js";
import User from "../../Models/User.js";

const frameworkResolvers = {
  Query: {
    async getFrameworkById(_, { _id }) {
      try {
        const result = await Framework.findById(_id);

        if (!result) {
          throw new Error(`Framework with id: ${_id}, could not be found.`);
        }

        return result;
      } catch (error) {
        throw new Error(`Query getFrameworkById failed: ${error.message}`);
      }
    },
  },
  Mutation: {
    async createFramework(_, { framework }) {
      try {
        const result = await Framework.create(framework);
        return result;
      } catch (error) {
        throw new Error(`Mutation createFramework failed: ${error.message}`);
      }
    },
    async deleteFramework(_, { _id }) {
      try {
        const result = await Framework.deleteOne({ _id });
        await User.updateMany(
          { frameworks: { $in: [_id] } },
          { $pull: { frameworks: _id } }
        );

        return result.deletedCount === 1;
      } catch (error) {
        throw new Error(`Mutation deleteFramework failed: ${error.message}`);
      }
    },
    async editFramework(_, { _id, newFramework }) {
      try {
        const framework = await Framework.findById(_id);

        Object.entries(newFramework).forEach(([key, value]) => {
          if (value) {
            framework[key] = value;
          }
        });

        await framework.save();

        return framework;
      } catch (error) {
        throw new Error(`Mutation editFramework failed: ${error.message}`);
      }
    },
    async addFrameworkNarative(_, { _id, narative }) {
      try {
        const frameworkData = await Framework.findById(_id);
        let naratives = frameworkData.naratives;

        if (naratives.includes(narative)) {
          return naratives;
        }

        naratives.push(narative);
        const result = await Framework.updateOne({ _id }, { naratives });

        return naratives;
      } catch (error) {
        throw new Error(
          `Mutation addFrameworkNarative failed: ${error.message}`
        );
      }
    },
  },
};

export default frameworkResolvers;
