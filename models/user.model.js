import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/SCATCH");

const userSchema = new Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
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
  cart: {
    type: Array,
    default: [],
  },
  isadmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contact: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
