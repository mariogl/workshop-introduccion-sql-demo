import express from "express";
import morgan from "morgan";
import trainersRouter from "../features/trainers/router/trainersRouter.js";
import workshopsRouter from "../features/workshops/router/workshopsRouter.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/trainers", trainersRouter);
app.use("/workshops", workshopsRouter);

export default app;
