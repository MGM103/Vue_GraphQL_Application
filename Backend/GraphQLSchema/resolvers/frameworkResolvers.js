import Framework from "../../Models/Framework.js";
import User from "../../Models/User.js";

const frameworkResolvers = {
  Query: {
    async getFrameworkById(_, { _id }) {
      return await Framework.findById(_id);
    },
  },
  Mutation: {
    async createFramework(_, { framework }) {
      return await Framework.create(framework);
    },
    async deleteFramework(_, { _id }) {
      const result = await Framework.deleteOne({ _id });
      await User.updateMany(
        { frameworks: { $in: [_id] } },
        { $pull: { frameworks: _id } }
      );

      return result.deletedCount === 1;
    },
    async editFramework(_, { _id, newFramework }) {
      const framework = await Framework.findById(_id);

      Object.entries(newFramework).forEach(([key, value]) => {
        if (value) {
          framework[key] = value;
        }
      });

      await framework.save();

      return framework;
    },
    async addFrameworkNarative(_, { _id, narative }) {
      const frameworkData = await Framework.findById(_id);
      let naratives = frameworkData.naratives;

      if (naratives.includes(narative)) {
        return naratives;
      }

      naratives.push(narative);
      const result = await Framework.updateOne({ _id }, { naratives });

      return naratives;
    },
  },
};

export default frameworkResolvers;
