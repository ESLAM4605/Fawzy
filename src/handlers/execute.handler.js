import { ErrorHandler } from "../../utils/error.handler.js";

export const executeQuery = ({ status = 200 } = {}) => {
  return ErrorHandler(async (req, res, next) => {
    const message = await req.dbQuery;
    console.log(res);
    res.status(status).json({ message });
  });
};
