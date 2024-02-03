import Joi from "joi";
import { AppError } from "../../../utils/error.handler.js";

export const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    body: {
      name: Joi.string().alphanum().min(2).max(20).required(),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().required(),
    },
    params: {},
    query: {},
  });
  const { body, params, query } = req;
  const { error } = schema.validate(
    {
      body,
      params,
      query,
      ...(req.file && { file: req.file }),
      ...(req.files && { file: req.files }),
    },
    { abortEarly: false }
  );
  if (error) throw new AppError(error, 400);
  next();
};
export const signInValidation = (req, res, next) => {
  const schema = Joi.object({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
    params: {},
    query: {},
  });
  const { body, params, query } = req;
  const { error } = schema.validate(
    {
      body,
      params,
      query,
      ...(req.file && { file: req.file }),
      ...(req.files && { file: req.files }),
    },
    { abortEarly: false }
  );
  if (error) throw new AppError(error, 400);
  next();
};

export const updateUserValidation = (req, res, next) => {
  const schema = Joi.object({
    body: {
      name: Joi.string().alphanum().min(2).max(20),
      email: Joi.string().email(),
      password: Joi.string(),
    },
    params: {
      id: Joi.string(),
    },
    query: {},
  });
  const { body, params, query } = req;
  const { error } = schema.validate(
    {
      body,
      params,
      query,
      ...(req.file && { file: req.file }),
      ...(req.files && { file: req.files }),
    },
    { abortEarly: false }
  );
  if (error) throw new AppError(error, 400);
  next();
};
