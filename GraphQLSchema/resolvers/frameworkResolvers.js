import Framework from '../../models/Framework.js';

const frameworkResolvers = {
    Query: {
        async getFramework(_, { id }){ 
            return await Framework.findById(id);
        }
    },
    Mutation: {
        async createFramework(_, {framework}) {
            return await Framework.create(framework)
        },
        async deleteFramework(_, { id }){
            const result = await Framework.deleteOne({ _id: id });
            return result.ok === 1;
        },
        async editFramework(_, { framework }) {
            return await Framework.updateOne({id: framework.id}, { framework });
        }
    }
}

export default frameworkResolvers;