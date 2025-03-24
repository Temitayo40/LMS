import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DB connection established")
    );

    await mongoose.connect(`${process.env.MONGO_DB_URL}/lms`);
  } catch (error) {
    console.log("💥💥💥 connection not successful");
  }
};

export default connectDB;
