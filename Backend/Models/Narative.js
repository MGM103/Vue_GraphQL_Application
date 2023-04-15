import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NarativeSchema = new Schema({
  name: { type: String },
  description: { type: String }
});

const Narative = mongoose.model('narative', NarativeSchema);

export default Narative;