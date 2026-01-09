import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://patelkrupa93281912_db_user:cItvfkX80U2SQUoW@fooddelivery.elzsgck.mongodb.net/fooddelivery?retryWrites=true&w=majority&appName=FoodDelivery"
    )
    .then(() => {
      console.log("DB connected");
    });
};
// patelkrupa93281912_db_user
// cItvfkX80U2SQUoW
// mongodb+srv://patelkrupa93281912_db_user:cItvfkX80U2SQUoW@fooddelivery.elzsgck.mongodb.net/?appName=FoodDelivery