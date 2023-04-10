import Framework from '../../models/Framework.js';
import User from '../../models/User.js';

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
            const result = await Framework.deleteOne({_id: id});
            await User.updateMany(
                {frameworks: {$in: [id]}},
                {$pull: {frameworks: id}}
            );
            console.log(result);
            return result.deletedCount === 1;
        },
        async editFramework(_, { framework }) {
            return await Framework.updateOne({id: framework.id}, { framework });
        },
        async addFrameworkNarative(_, {id, narative}) {
            console.log(id, narative);
            const frameworkData = await Framework.findById(id);
            console.log(frameworkData);
            let naratives = frameworkData.naratives;

            if(naratives.includes(narative)){
                return naratives;
            }

            naratives.push(narative);
            const result = await Framework.updateOne({_id: id}, {naratives});
            console.log(result);
            return naratives;
        }
    }
}

export default frameworkResolvers;