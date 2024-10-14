import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config"


import connectToDatabase from "./config/mongoose.config.js";
import { ownerRoute } from "./routes/owner.route.js";
import { userRoute } from "./routes/user.route.js";
import { productRoute } from "./routes/product.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownerRoute);
app.use("/users", userRoute);
app.use("/products",productRoute)

app.listen(3000, () => {
  console.log("Server running");
});
