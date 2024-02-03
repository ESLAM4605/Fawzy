import { AppError, ErrorHandler } from "../../../../utils/error.handler.js";
import prodctModel from "../models/product.model.js";

const getAllProducts = ErrorHandler(async (req, res) => {
  const Products = await prodctModel.find();

  if (Products.length === 0) throw new AppError("Products not found", 404);

  return res.json(Products);
});
const addProduct = ErrorHandler(async (req, res) => {
  const Product = await prodctModel.findOne({ title: req.body.title });

  if (Product) throw new AppError("Product alredy exist", 400);
  const newProduct = await prodctModel.create(req.body);
  return res.status(201).json({ message: "Product Added" });
});
const updateProduct = ErrorHandler(async (req, res) => {
  const Product = await prodctModel.findOneAndUpdate(
    { slug: req.params.slug },
    req.body
  );
  if (!Product) throw new AppError("Product not found", 404);

  return res.status(201).json({ message: "Product Updated" });
});
const getProduct = ErrorHandler(async (req, res) => {
  const Product = await prodctModel.findOne({
    slug: req.params.slug,
  });
  if (!Product) throw new AppError("Product not found", 404);

  return res.json({ Product });
});
const deleteProduct = ErrorHandler(async (req, res) => {
  const Product = await prodctModel.findOneAndDelete({
    slug: req.params.slug,
  });
  if (!Product) throw new AppError("Product not found", 404);

  return res.status(201).json({ message: "Product Deleted" });
});

export { getAllProducts, addProduct, updateProduct, getProduct, deleteProduct };
