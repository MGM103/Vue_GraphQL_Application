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
    createNarative: (_, { narative }) => {
      try {
        const result = Narative.create(narative);
        return result;
      } catch (error) {
        throw new Error(`Mutation createNarative failed: ${error.message}`);
      }
    },
    deleteNarative: async (_, { _id }) => {
      try {
        const deleteNarative = await Narative.deleteOne({ _id });

        await Framework.updateMany(
          { naratives: { $in: [_id] } },
          { $pull: { naratives: _id } }
        );

        return deleteNarative.deletedCount === 1;
      } catch (error) {
        throw new Error(`Mutation deleteNarative failed: ${error.message}`);
      }
    },
    editNarative: async (_, { _id, newNarative }) => {
      try {
        const narative = await Narative.findById(_id);

        Object.entries(newNarative).forEach(([key, value]) => {
          if (value !== "") {
            narative[key] = value;
          }
        });

        await narative.save();

        return narative;
      } catch (error) {
        console.log(`Mutation editNarative failed: ${error.message}`);
      }
    },
  },
};

export default narativeResolvers;
