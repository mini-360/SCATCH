import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  image: {
    type: Buffer,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: {
    type: String,
  },
  panelcolor: {
    type: String,
  },
  textcolor: {
    type: String,
  },
});

export const Product = mongoose.model("Product", productSchema);
