import userModel from "./user.model.js";
import { AppError, ErrorHandler } from "../../../utils/error.handler.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const getAllUsers = ErrorHandler(async (req, res) => {
  const data = await userModel.find();

  if (data.length === 0) throw new AppError("Users not found", 404);

  return res.json(data);
});
const signUp = ErrorHandler(async (req, res) => {
  const { name, email, password, age } = req.body;

  const user = await userModel.findOne({ email });

  if (user) throw new AppError("User already exist", 400);

  const hashPassword = bcrypt.hashSync(password, 5);

  const newUser = await userModel.create({
    name,
    email,
    password: hashPassword,
    age,
  });
  // // send Email
  // const messageSent = await sendEmail({
  //   to: newUser.email,
  //   subject: "Acount Activation",
  //   text: "Hello",
  // });

  // if (!messageSent) throw new AppError("Invalid message sent!", 400);
  return res.status(201).json({ message: "Signed up successfuly" });
});
const signIn = ErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) throw new AppError("User doesn't exist", 400);

  const { name, _id, role } = user;
  const token = Jwt.sign({ name, email, _id, role }, "secret");

  if (!user) throw new AppError("User not exist", 400);

  const comparePass = bcrypt.compareSync(password, user.password);

  if (user && comparePass)
    return res.status(200).json({ message: "Signed in successfuly", token });

  throw new AppError("Wrong email or password", 400);
});
const updateUser = ErrorHandler(async (req, res) => {
  const { _id } = req.user;

  const { name, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 5);

  const user = await userModel.findByIdAndUpdate(
    _id,
    { name, email, password: hashPassword },
    { new: true }
  );

  if (!user) throw new AppError("User not exist", 400);

  return res.json({ message: "User Updated" });
});
const deleteUser = ErrorHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await userModel.findByIdAndDelete(_id);

  if (!user) throw new AppError("User not exist", 400);

  return res.json({ message: "User Deleted" });
});

export { getAllUsers, signUp, updateUser, deleteUser, signIn };
