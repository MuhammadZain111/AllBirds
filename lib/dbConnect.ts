import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

// Prevent multiple connections in dev (hot reload safe)
const globalWithMongoose = global as typeof globalThis & {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const cached =
  globalWithMongoose.mongoose ||
  (globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  });

 async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "my_birds",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}


export default dbConnect;