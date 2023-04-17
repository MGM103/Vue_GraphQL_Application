import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}

export async function initTestDb() {
  mongoServer = await MongoMemoryServer.create();
  const mongoConnURI = mongoServer.getUri();
  await mongoose.connect(mongoConnURI, mongoOptions);
  return mongoose.connection.db;
}

export async function shutDownTestDb() {
  await mongoose.disconnect();
  await mongoServer.stop();
}