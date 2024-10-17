import mongoose, { Schema } from "mongoose";


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
  cart: [{
    type: Schema.Types.ObjectId,
    ref:"Product"
  }],
  orders: {
    type: Array,
    default: [],
  },
  contact: {
    type: Number,
    // required: true,
  },
  picture: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
