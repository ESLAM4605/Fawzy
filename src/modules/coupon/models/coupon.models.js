import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      minLength: 3,
      maxLength: 250,
      required: true,
      trim: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const couponModel = mongoose.model("Coupon", couponSchema);

export default couponModel;
