import express from "express";

import {
  authController,
  loginUser,
  logout,
} from "../controllers/userAuth.controller.js";

const router = express.Router();

router.post("/register", authController);

router.post("/login", loginUser);

router.get("/logout", logout);

export const userRoute = router;
