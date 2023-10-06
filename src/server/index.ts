import express from "express";
import morgan from "morgan";
import trainersRouter from "../features/trainers/router/trainersRouter.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/trainers", trainersRouter);

export default app;
