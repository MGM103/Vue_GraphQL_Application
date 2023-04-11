import Narative from '../../models/Narative.js';
import Framework from '../../models/Framework.js';

const narativeResolvers = {
  Query: {
    async getNarativeByName(_, { name }) {
        return await Narative.findOne({name: name});
    },
    async getNarativeById(_, { id }) {
        return await Narative.findById(id);
    }
  },
  Mutation: {
    createNarative: (_, { narative }) => Narative.create(narative),
    deleteNarative: async (_, { id }) => {
      const deleteNarative = await Narative.deleteOne({ _id: id });

      await Framework.updateMany(
        {naratives: {$in: [id]}},
        {$pull: {naratives: id}}
      );

      return deleteNarative.deletedCount === 1;
    },
    editNarative: async (_, { id, newNarative }) => {
      const narative = await Narative.findById(id);

      Object.entries(newNarative).forEach(([key, value]) => {
        if(value !== ""){
          narative[key] = value;
        }
      });

      await narative.save();

      return narative;
    }
  }
};

export default narativeResolvers;