import { Router } from "express";
import {
  getAllUsers,
  signUp,
  updateUser,
  deleteUser,
  signIn,
} from "./user.controller.js";

import {
  signUpValidation,
  signInValidation,
  updateUserValidation,
} from "./user.validation.js";

import { authenticate, authorize } from "../../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get(getAllUsers).post(signUpValidation, signUp);

router.route("/delete").delete(authenticate, deleteUser);

router.route("/update").put(updateUserValidation, authenticate, updateUser);

router.route("/signin").post(signInValidation, signIn);

export default router;
