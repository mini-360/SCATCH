import mongoose, { Schema } from "mongoose";

const ownerSchema = new Schema({
  fullname: {
    type: String,
    trim: true,
    minLength: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    default: [],
  },
  picture: {
    type: String,
  },
  gstin: String,
});

export const Owner = mongoose.model("Owner", ownerSchema);
