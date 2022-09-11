import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    const { password, ...others } = newUser._doc;
    res.status(200).send({
      message: "User has been created!",
      user: others,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted!" });
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can't delete your account!"));
  }
};
