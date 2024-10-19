import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await Product.find();
  let success = req.flash("success");
  let error = req.flash("error");
  res.render("shop", { products, success, error });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).populate("cart");

  const bill = Number(user.cart[0].price + 20) - Number(user.cart[0].discount);
  res.render("cart", { user, bill });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.email });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/shop");
    }

    user.cart.push(req.params.productid);
    await user.save();

    req.flash("success", "Added to cart");
    res.redirect("/shop");
  } catch (error) {
    req.flash("error", "Something went wrong");
    res.redirect("/shop");
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("shop");
});

export const indexRouter = router;
