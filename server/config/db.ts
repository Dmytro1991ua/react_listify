import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI!);

    console.log(`MongoDb connected ${connect.connection.host}`.blue.underline);
  } catch (error) {
    console.log((error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
