import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Error')
}

let cached = global.mongoose || { conn: null, promise: null }

global.mongoose = cached

export async function connectDB() {
  if (cached.conn) return cached.conn

  cached.promise = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((mongoose) => mongoose)

  cached.conn = await cached.promise
  return cached.conn
}
