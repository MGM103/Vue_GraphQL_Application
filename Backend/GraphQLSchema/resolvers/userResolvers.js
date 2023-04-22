import User from '../../Models/User.js';

const userResolvers = {
  Query: {
    async getUserFrameworks(_, { _id }) { 
      const result = await User.findById(_id);
      return result.frameworks;
    },
    async getUserById(_, { _id }) {
      return await User.findById(_id);
    },
    async getUserByName(_, { name }){
      return await User.findOne({ username: name });
    }
  },
  Mutation: {
    createUser: (_, { user }) => User.create(user),
    deleteUser: async (_, { _id }) => {
      const result = await User.deleteOne({ _id });
      return result.deletedCount === 1;
    },
    changePassword: async (_, { _id, password }) => {
      const result = await User.updateOne({ _id }, { password });
      return result.modifiedCount === 1;
    },
    addFramework: async (_, { _id, framework }) => {
      const userData = await User.findById(_id);
      let frameworks = userData.frameworks;

      if(frameworks.includes(framework)){
        return frameworks;
      }

      frameworks.push(framework);
      const result = await User.updateOne({_id}, {frameworks});

      return frameworks;
    }
  }
};

export default userResolvers;