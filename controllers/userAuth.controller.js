import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const authController = async (req, res) => {
  let { email, fullname, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(401).send("User already have account");
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    if (err) {
      res.send(err.message);
    }

    try {
      let user = await User.create({
        email,
        password: hashed_password,
        fullname,
      });
      let token = generateToken(user);
      //   res.cookie("token", token);
      res.send("user created successfully");
    } catch (error) {
      res.send(error.message);
    }
  });
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(403).send("Email or password incorrect");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res
        .status(403)
        .send("Error occurred while login please try again");
    }
    if (!result) {
      return res.status(403).send("incorrect email or password");
    }
    let token = generateToken(user);
    res.cookie("token", token);
    res.send("you can login")
  });
};

export { authController, loginUser };
