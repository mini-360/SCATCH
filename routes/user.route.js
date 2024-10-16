import express from "express";

import { authController,loginUser } from "../controllers/userAuth.controller.js";

const router = express.Router();

router.post("/register", authController);

router.post("/login",loginUser)

export const userRoute = router;
