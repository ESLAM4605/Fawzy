import mongoose from "mongoose";

const product_cartSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cart",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

const product_cartModel = mongoose.model("ProductCart", product_cartSchema);

export default product_cartModel;
