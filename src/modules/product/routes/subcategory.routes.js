import { Router } from "express";

import {
  AddsubCaregoryValidations,
  UpdatesubCaregoryValidations,
} from "../validation/subcategory.validations .js";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindOneQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.miidleware.js";
import subCategoryModel from "../models/subcategory.model.js";
import { executeQuery } from "../../../handlers/execute.handler.js";
import { filterQuery } from "../../../middlewares/features.middleware.js";
import {
  attachcategoryID,
  filterSubCategory,
} from "../middlewares/filterSubCategory.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(attachFindQuery(subCategoryModel), filterSubCategory(), executeQuery())
  .post(
    attachcategoryID,
    AddsubCaregoryValidations,
    attachAddQuery(subCategoryModel),
    executeQuery({ status: 201 })
  );

router
  .route("/:subCategorySlug")
  .get(
    attachFindOneQuery(subCategoryModel),
    filterQuery({ fieldName: "slug", paramName: "subCategorySlug" }),
    executeQuery()
  )
  .put(
    UpdatesubCaregoryValidations,
    attachUpdateQuery(subCategoryModel),
    filterQuery({ fieldName: "slug", paramName: "subCategorySlug" }),
    executeQuery()
  )
  .delete(
    attachDeleteQuery(subCategoryModel),
    filterQuery({ fieldName: "slug", paramName: "subCategorySlug" }),
    executeQuery()
  );

export default router;
