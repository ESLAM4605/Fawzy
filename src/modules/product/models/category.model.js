import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [200, "Too long category name"],
    },
    slug: {
      type: String,
      minlength: 3,
      maxlength: 200,
      lowercase: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});
categorySchema.pre(/update/, function (next) {
  if (this._update.name) this._update.slug = slugify(this._update.name);
  next();
});

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
