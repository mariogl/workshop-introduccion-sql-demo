import { Router } from "express";
import TrainerController from "../controller/TrainerController.js";

const trainersRouter = Router();

const trainersController = new TrainerController();

trainersRouter.get("/", trainersController.getAll);
trainersRouter.get("/:id", trainersController.getById);
trainersRouter.post("/", trainersController.create);
trainersRouter.put("/", trainersController.update);
trainersRouter.delete("/:id", trainersController.delete);

export default trainersRouter;
