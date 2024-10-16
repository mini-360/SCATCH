import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const authController = async (req, res) => {
  let { email, fullname, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    req.flash("error", "You already have an account, please login.");
    return res.redirect("/");
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    if (err) {
      return res.send(err.message);
    }

    try {
      let user = await User.create({
        email,
        password: hashed_password,
        fullname,
      });
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } catch (error) {
      res.send(error.message);
    }
  });
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await User.findOne({ email: email });

  if (!user) {
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res
        .status(403)
        .send("Error occurred while login please try again");
    }
    if (!result) {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }
    let token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  });
};

const logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

export { authController, loginUser, logout };
