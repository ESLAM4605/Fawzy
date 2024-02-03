import { ErrorHandler } from "../../../../utils/error.handler.js";
import categoryModel from "../models/category.model.js";

export const filterSubCategory = () => {
  return ErrorHandler(async (req, res, next) => {
    const { categorySlug } = req.params;
    const category = await categoryModel.findOne({
      slug: categorySlug,
    });
    req.dbQuery = req.dbQuery.where({ categoryID: category._id });
    next();
  });
};

export const attachcategoryID = () =>
  ErrorHandler(async (req, res, next) => {
    console.log(3);
    const { categorySlug } = req.params;
    const category = await categoryModel.findOne({ slug: categorySlug });
    console.log(category);
    req.body.categoryID = category._id;
    next();
  });
