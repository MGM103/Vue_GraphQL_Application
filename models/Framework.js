const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FrameworkSchema = new Schema({
  protocol: {type: String},
  naratives: [{type: Schema.Types.ObjectId, ref: 'narative'}],
  competitors: [{type: String}],
  thesis: {type: String},
  bullcase: {type: String},
  bearcase: {type: String},
  aquisitionStrat: {type: String},
  exitConditions: {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'user'}
});

FrameworkSchema.statics.getUser = function(id) {
  return this.findById(id)
    .populate('user')
    .then(framework => framework.user);
}

FrameworkSchema.statics.getNarative = function(id) {
  return this.findById(id)
    .populate('naratives')
    .then(framework => framework.naratives);
}

FrameworkSchema.statics.addNarative = function(id, name) {
  const Narative = mongoose.model('narative');

  return this.findById(id)
    .then(framework => {
      const narative = new Narative({ name, framework });
      framework.naratives.push(narative);
      return Promise.all([narative.save(), framework.save()])
        .then(([framework]) => framework);
    });
};

mongoose.model('framework', FrameworkSchema);