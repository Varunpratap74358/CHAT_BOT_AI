import express from "express";
import { login, myProfile, verifyUser } from "../controler/userController.js";
import { isAuth } from "../middelware/isAuth.js";

const route = express.Router();
route.post("/login", login);
route.post("/verify", verifyUser);
route.get("/me", isAuth, myProfile);

export default route;
