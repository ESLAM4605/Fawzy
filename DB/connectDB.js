import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/e-commerce")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};
