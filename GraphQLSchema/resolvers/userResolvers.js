import User from '../../models/User.js';

const userResolvers = {
  Query: {
    async getUserFrameworks(_, { id }) { 
      return await User.findFramework(id);
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
      return result.ok === 1;
    },
    changePassword: async (_, { id, password }) => {
      const result = await User.updateOne({ _id: id }, { password });
      return result.ok === 1;
    }
  },
  User: {
    frameworks: (parent) => User.findFramework(parent.id)
  }
};

export default userResolvers;