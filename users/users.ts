import express from "express";
import { Router } from "express";

export const userRouter: Router = express.Router();

userRouter.use((req, res, next) => {
  console.log(`Users request received at: ${new Date().toLocaleString()}`);
  next();
});

userRouter.get("/login", (req, res) => {
  res.send("ok");
});
