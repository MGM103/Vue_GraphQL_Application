import Narative from '../../Models/Narative.js';
import Framework from '../../Models/Framework.js';

const narativeResolvers = {
  Query: {
    async getNarativeByName(_, { name }) {
        return await Narative.findOne({name: name});
    },
    async getNarativeById(_, { _id }) {
        return await Narative.findById(_id);
    }
  },
  Mutation: {
    createNarative: (_, { narative }) => Narative.create(narative),
    deleteNarative: async (_, { _id }) => {
      const deleteNarative = await Narative.deleteOne({ _id });

      await Framework.updateMany(
        {naratives: {$in: [_id]}},
        {$pull: {naratives: _id}}
      );

      return deleteNarative.deletedCount === 1;
    },
    editNarative: async (_, { _id, newNarative }) => {
      const narative = await Narative.findById(_id);

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