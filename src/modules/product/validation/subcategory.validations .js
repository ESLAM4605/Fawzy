import Joi from "joi";
import { AppError } from "../../../../utils/error.handler.js";

export const AddsubCaregoryValidations = (req, res, next) => {
  const schema = Joi.object({
    body: {
      name: Joi.string().min(3).max(200).required(),
      categoryID: Joi.string().hex().length(24),
      image: Joi.string(),
    },
    params: { categorySlug: Joi.string() },
    query: {},
  });
  const { body, query, params } = req;

  const { error } = schema.validate(
    { body, query, params },
    { abortEarly: false }
  );
  console.log({ body, query, params });
  if (error)
    throw new AppError(error.details[0].message.split('"').join(""), 400);
  console.log(2);
  console.log(next);
  next();
  console.log(1);
};
export const UpdatesubCaregoryValidations = (req, res, next) => {
  const schema = Joi.object({
    body: {
      name: Joi.string().min(3).max(200).required(),
      categoryID: Joi.string(),

      image: Joi.string(),
    },
    query: {},
    params: {
      subCategorySlug: Joi.string(),
      categorySlug: Joi.string(),
    },
  });
  const { body, query, params } = req;

  const { error } = schema.validate(
    { body, query, params },
    { abortEarly: false }
  );

  if (error)
    throw new AppError(error.details[0].message.split('"').join(""), 400);
  next();
};
