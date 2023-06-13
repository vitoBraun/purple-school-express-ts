import express, { Request, Response, NextFunction } from "express";
import { userRouter } from "./users/users.js";
const port = 8000;
const app = express();

app.use((req, res, next) => {
  console.log(`Request received at: ${new Date().toLocaleString()}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/users", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(`I got error:  ${err.message}`);
});

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
