import Joi from "joi";
import { AppError } from "../../../../utils/error.handler.js";

export const AddCategoryValidations = (req, res, next) => {
  const schema = Joi.object({
    body: {
      name: Joi.string().min(3).max(200).required(),
      image: Joi.string(),
    },
    query: {},
    params: {},
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
export const UpdateCategoryValidations = (req, res, next) => {
  const schema = Joi.object({
    body: {
      name: Joi.string().min(3).max(200).required(),
      image: Joi.string(),
    },
    query: {},
    params: {
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
