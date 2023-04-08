import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FrameworkSchema = new Schema({
  protocol: {type: String},
  naratives: [{type: Schema.Types.ObjectId, ref: 'narative'}],
  competitors: [{type: String}],
  thesis: {type: String},
  bullcase: {type: String},
  bearcase: {type: String},
  acquisitionStrat: {type: String},
  exitConditions: {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'user'}
});

const Framework = mongoose.model('framework', FrameworkSchema);

export default Framework;