import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { Product } from "../models/product.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error,loggedin:false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await Product.find();
  res.render("shop", { products });
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("shop")
})

export const indexRouter = router;
