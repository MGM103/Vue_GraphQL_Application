import User from '../../models/User.js';

const userResolvers = {
  Query: {
    async getUserFrameworks(_, { id }) { 
      const result = await User.findById(id);
      return result.frameworks;
    },
    async getUserById(_, { id }) {
      return await User.findById(id);
    },
    async getUserByName(_, { name }){
      return await User.findOne({ username: name });
    }
  },
  Mutation: {
    createUser: (_, { user }) => User.create(user),
    deleteUser: async (_, { user }) => {
      const result = await User.deleteOne({ _id: user.id });
      return result.modifiedCount === 1;
    },
    changePassword: async (_, { id, password }) => {
      const result = await User.updateOne({ _id: id }, { password });
      return result.modifiedCount === 1;
    },
    addFramework: async (_, {id, framework}) => {
      const userData = await User.findById(id);
      let frameworks = userData.frameworks;

      if(frameworks.includes(framework)){
        return frameworks;
      }

      frameworks.push(framework);
      const result = await User.updateOne({_id: id}, {frameworks});

      return frameworks;
    }
  }
};

export default userResolvers;