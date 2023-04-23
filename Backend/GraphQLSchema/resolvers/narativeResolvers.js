import Narative from "../../Models/Narative.js";
import Framework from "../../Models/Framework.js";

const narativeResolvers = {
  Query: {
    async getNarativeByName(_, { name }) {
      try {
        const result = await Narative.findOne({ name });

        if (!result) {
          throw new Error("Narative matching that name could not be found :(");
        }

        return result;
      } catch (error) {
        throw new Error(`Query getNarativeByName failed: ${error.message}`);
      }
    },
    async getNarativeById(_, { _id }) {
      try {
        const result = await Narative.findById(_id);

        if (!result) {
          throw new Error("Narative matching that Id could not be found :(");
        }

        return result;
      } catch (error) {
        throw new Error(`Query getNarativeById failed: ${error.message}`);
      }
    },
  },
  Mutation: {
    createNarative: (_, { narative }) => Narative.create(narative),
    deleteNarative: async (_, { _id }) => {
      const deleteNarative = await Narative.deleteOne({ _id });

      await Framework.updateMany(
        { naratives: { $in: [_id] } },
        { $pull: { naratives: _id } }
      );

      return deleteNarative.deletedCount === 1;
    },
    editNarative: async (_, { _id, newNarative }) => {
      const narative = await Narative.findById(_id);

      Object.entries(newNarative).forEach(([key, value]) => {
        if (value !== "") {
          narative[key] = value;
        }
      });

      await narative.save();

      return narative;
    },
  },
};

export default narativeResolvers;
