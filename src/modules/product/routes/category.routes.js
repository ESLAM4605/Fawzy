import { Router } from "express";

import {
  AddCategoryValidations,
  UpdateCategoryValidations,
} from "../validation/category.validations.js";

import categoryModel from "../models/category.model.js";
import { executeQuery } from "../../../handlers/execute.handler.js";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindOneQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.miidleware.js";
import { filterQuery } from "../../../middlewares/features.middleware.js";
import subCategoryRoutre from "./subcategory.routes.js";

const router = Router();

router
  .route("/")
  .get(attachFindQuery(categoryModel), executeQuery())
  .post(
    AddCategoryValidations,
    attachAddQuery(categoryModel),
    executeQuery({ status: 201 })
  );

router
  .route("/:caregorySlug")
  .put(
    UpdateCategoryValidations,
    attachUpdateQuery(categoryModel),
    filterQuery({ fieldName: "slug", paramName: "caregorySlug" }),
    executeQuery()
  )
  .get(
    attachFindOneQuery(categoryModel),
    filterQuery({ fieldName: "slug", paramName: "caregorySlug" }),
    executeQuery()
  )
  .delete(
    attachDeleteQuery(categoryModel),
    filterQuery({ fieldName: "slug", paramName: "caregorySlug" }),
    executeQuery()
  );

router.use("/:categorySlug/subcategories", subCategoryRoutre);

export default router;
