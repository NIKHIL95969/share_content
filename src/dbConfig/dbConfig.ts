import mongoose from "mongoose";

export async function connect() {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined");
  }
  await mongoose.connect(mongoUrl);
  console.log("✅ MongoDB connected");
}
