import express from "express";
import { connectDB } from "./DB/connectDB.js";
import { AppError } from "./utils/error.handler.js";
import categoryRouter from "./src/modules/product/routes/category.routes.js";
import subCategoryRouter from "./src/modules/product/routes/subcategory.routes.js";
import userRouter from "./src/modules/user/user.routes.js";
import productRouter from "./src/modules/product/routes/product.routes.js";
import morgan from "morgan";
const app = express();
const PORT = 3000;

// DB Connection
connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use("/categories", categoryRouter);
app.use("/subcategories", subCategoryRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.all("*", (req, res, next) => {
  throw new AppError("Can't find this route", 400);
});

// Global Error
app.use((err, req, res, next) => {
  const { message, status, stack } = err;

  res.status(status || 500).json({ message, stack });
  console.log({ err, stack });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
