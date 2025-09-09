import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) return;
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined");
  }
  await mongoose.connect(mongoUrl);
  isConnected = true;
  console.log("✅ MongoDB connected");
}
