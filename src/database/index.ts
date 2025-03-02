import mongoose from "mongoose";

const connectToDB = async () => {
  const DB_URI = process.env.DB_URI;

  if (!DB_URI) {
    throw new Error("No DB URL found");
  }

  const dbInstance = await mongoose.connect(DB_URI);
  if (!dbInstance) {
    throw new Error("Unable to connect to DB!");
  } else {
    console.log("Connected to DB!");
  }
};


export { connectToDB }