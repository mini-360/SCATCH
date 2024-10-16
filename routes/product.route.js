import express from "express";

import { upload } from "../config/multer.config.js";
import { Product } from "../models/product.model.js";

const router = express.Router();

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let product = await Product.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
      req.flash("success","Product added successfully")
    res.redirect("/owners/admin");
  } catch (error) {
    res.send(err.message);
  }
});

export const productRoute = router;
