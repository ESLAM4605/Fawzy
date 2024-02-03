import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").get(getAllProducts).post(addProduct);

router.route("/:slug").get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;
