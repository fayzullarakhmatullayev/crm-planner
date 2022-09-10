import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../error.js";

export const SignUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
    await newUser.save();
    const { password, ...others } = newUser._doc;
    res.status(200).send({
      message: "User has been created!",
      success: true,
      access_token: token,
      user: others,
    });
  } catch (err) {
    next(err);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Wrong credentials!"));
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    const { password, ...others } = user._doc;

    res.status(200).json({ user: others, success: true, access_token: token });
  } catch (err) {
    next(err);
  }
};
