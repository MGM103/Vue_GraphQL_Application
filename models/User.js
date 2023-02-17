const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  frameworks: [{ type: Schema.Types.ObjectId, ref: 'framework' }]
});

UserSchema.statics.addFramework = function(id, protocol) {
  const Framework = mongoose.model('framework');

  return this.findById(id)
    .then(user => {
      const framework = new Framework({ protocol, user });
      user.frameworks.push(framework);
      return Promise.all([framework.save(), user.save()])
        .then(([user]) => user);
    });
};

UserSchema.statics.findFramework = function(id) {
  return this.findById(id)
    .populate('frameworks')
    .then(user => user.frameworks);
};

mongoose.model('user', UserSchema);