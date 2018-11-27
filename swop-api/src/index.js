import express from "express";
import mongoose from "mongoose";
import auth from "./routes/auth";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import users from "./routes/users";
import Promise from "bluebird";

const app = express();
dotenv.config();

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/swop");
app.use(bodyParser.json());

app.use("/api/auth", auth);
app.use("/api/users", users);

app.listen(8080, () => console.log("API is running"));
