import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [3, "Too short title"],
    maxLength: [200, "Too long title"],
    required: true,
    trim: true,
  },
  description: {
    type: String,
    minLength: [3, "Too short description"],
    maxLength: [2000, "Too long description"],
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    minLength: 3,
    maxLength: 250,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  discounted_price: {
    type: Number,
    required: true,
    min: 0.01,
    validate: {
      validator: function (value) {
        return value <= this.price;
      },
      message: "The discount must be less than the initial price",
    },
  },
  cover_image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  features: [
    {
      key: String,
      value: String,
    },
  ],
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

const prodctModel = mongoose.model("Product", productSchema);

export default prodctModel;
