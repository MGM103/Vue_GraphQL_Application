import Framework from '../../Models/Framework.js';
import User from '../../Models/User.js';

const frameworkResolvers = {
    Query: {
        async getFrameworkById(_, { _id }){ 
            return await Framework.findById(_id);
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
        async editFramework(_, { id, newFramework }) {
            const framework = await Framework.findById(id);

            Object.entries(newFramework).forEach(([key, value]) => {
                if(value !== ""){
                    framework[key] = value;
                };
            });

            await framework.save();

            return framework;
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