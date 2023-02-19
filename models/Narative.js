import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NarativeSchema = new Schema({
  name: { type: String },
  description: { type: String },
  frameworks: [{ type: Schema.Types.ObjectId, ref: 'framework' }]
});

NarativeSchema.statics.addFramework = function(id, protocol) {
  const Framework = mongoose.model('framework');

  return this.findById(id)
    .then(narative => {
      const framework = new Framework({ protocol, narative });
      narative.frameworks.push(framework);
      return Promise.all([framework.save(), narative.save()])
        .then(([narative]) => narative);
    });
};

NarativeSchema.statics.findFramework = function(id) {
  return this.findById(id)
    .populate('frameworks')
    .then(narative => narative.frameworks);
};

const Narative = mongoose.model('narative', NarativeSchema);

export default Narative;