import mongoose from "mongoose"

import dotenv from "dotenv"

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env")
}

// Use global cache (important for Next.js / dev hot reload)
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function DbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "my_birds",
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}