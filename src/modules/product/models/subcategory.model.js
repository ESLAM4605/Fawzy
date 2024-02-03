import mongoose from "mongoose";
import slugify from "slugify";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory must be unique"],
      minlength: [2, "To short SubCategory name"],
      maxlength: [32, "To long SubCategory name"],
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

subCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});
subCategorySchema.pre(/update/, function (next) {
  if (this._update.name) this._update.slug = slugify(this._update.name);
  next();
});

const subCategoryModel = mongoose.model("Subcategory", subCategorySchema);

export default subCategoryModel;
