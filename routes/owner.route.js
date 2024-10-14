import express from "express";

import { Owner } from "../models/owner.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/create", async (req, res) => {
  try {
    let owners = await Owner.find();
    console.log(owners);

    if (owners.length > 0) {
      return res
        .status(403)
        .send("You don't have permissions to create a new owner");
    }

    let { fullname, email, password } = req.body;
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
