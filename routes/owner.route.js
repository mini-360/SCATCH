import express from "express";

import { Owner } from "../models/owner.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/create", async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        
    let ownersemail = await Owner.findOne({email});

    if (ownersemail) {
      return res
        .status(403)
        .send("You don't have permissions to create a new owner");
    }

    
    let createdOwner = await Owner.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the owner");
  }
});

export const ownerRoute = router;
