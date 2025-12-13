import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://patelkrupa93281912_db_user:bNo6ZntmT2nEhGt6@learningcluster.cfuylsn.mongodb.net/"
    )
    .then(() => {
      console.log("DB connected");
    });
};
