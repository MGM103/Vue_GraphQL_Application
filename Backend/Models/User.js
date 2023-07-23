import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  frameworks: [{ type: Schema.Types.ObjectId, ref: "framework" }],
});

const User = mongoose.model("user", UserSchema);

export default User;
