import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected");
  } catch (err) {
    console.log("Connection failed", err);
  }
};

export default connectToDatabase;
