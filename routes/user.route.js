import express from "express";

const router = express.Router();

import {} from "../models/user.model.js";

router.post("/register", async (req, res) => {
    try { 
        
    }
    catch (err) {
        console.log(err.message);
    }
});

export const userRoute = router;
