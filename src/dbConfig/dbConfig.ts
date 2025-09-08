import mongoose from "mongoose";

export async function connect() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
  }

  try {
    await mongoose.connect(mongoUrl);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error. Please connect MongoDB: " + err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong while connecting to MongoDB");
    console.log(error);
    process.exit(1);
  }
}
