import express from "express"

const router = express.Router();


router.get("/", (req, res) => {
    let error=req.flash("error")
    res.render("index",{error})
})



export const indexRouter= router