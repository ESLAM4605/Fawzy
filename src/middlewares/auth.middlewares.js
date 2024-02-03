import { AppError } from "../../utils/error.handler.js";
import Jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.header("token");

  if (!token) throw new AppError("Unauthorized", 401);

  Jwt.verify(token, "secret", (error, encodedToken) => {
    if (error) throw new AppError("Invalid token", 498);
    req.user = encodedToken;
    next();
  });
};

export const authorize = (role) => {
  return (req, res, next) => {
    const { role: userRole } = req.user;

    if (role !== userRole) throw new AppError("Forbidden", 403);
    next();
  };
};
