import Narative from '../../models/Narative.js'

const narativeResolvers = {
  Query: {
    async getNarativeByName(_, { name }) {
        return await Narative.findOne({name: name});
    },
    async getNarativeById(_, { id }) {
        return await Narative.findById(id);
    },
    async getNarativeFrameworks(_, { name }) {
        return await Narative.find({ name: name }).exec();
    }
  },
  Mutation: {
    createNarative: (_, { narative }) => Narative.create(narative),
    deleteUser: async (_, { narative }) => {
      const result = await Narative.deleteOne({ _id: narative.id });
      return result.ok === 1;
    },
    editNarative: async (_, { narative }) => {
      const result = await Narative.updateOne({ _id: id }, { narative });
      return result.ok === 1;
    }
  },
  Narative: {
    frameworks: (parent) => Narative.findFramework(parent.id)
  }
};

export default narativeResolvers;