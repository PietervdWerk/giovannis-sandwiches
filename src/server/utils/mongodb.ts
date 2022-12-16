import mongoose from 'mongoose';
import { env } from '../../env/server.mjs';

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {conn: null, promise: null}
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(env.MONGODB_URI).then(mongoose => mongoose)
  }

  cached.conn = await cached.promise;
  return cached.conn
}

export default dbConnect;