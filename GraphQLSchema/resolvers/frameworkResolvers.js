import Framework from '../../models/Framework.js';

const frameworkResolvers = {
    Query: {
        async getFramework(_, { id }){ 
            return await Framework.findById(id);
        },
        async getFrameworksByProtocol(_, { protocol }) {
            return await Framework.find({protocol: protocol}).exec();
        }
    },
    Mutation: {
        async createFramework(_, {framework}) {
            return await Framework.create(framework)
        },
        async deleteFramework(_, { framework }){
            const result = await Framework.deleteOne({ _id: framework.id });
            return result.ok === 1;
        },
        async editFramework(_, { framework }) {
            return await Framework.updateOne({id: framework.id}, { framework });
        }
    }
}

export default frameworkResolvers;