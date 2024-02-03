import Joi from "joi";
import { AppError } from "../../../../utils/error.handler.js";

export const AddProductValidations = (req, res, next) => {
  const schema = Joi.object({
    body: {
      title: Joi.string().min(3).max(200).required(),
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
export const UpdateProductValidations = (req, res, next) => {
  const schema = Joi.object({
    body: {
      name: Joi.string().min(3).max(200).required(),
      image: Joi.string(),
    },
    query: {},
    params: {
      slug: Joi.string(),
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
