import { Router } from "express";
import WorkShopController from "../controller/WorkshopsController.js";

const trainersRouter = Router();

const workshopsController = new WorkShopController();

trainersRouter.get("/", workshopsController.getAll);
trainersRouter.get("/:id", workshopsController.getById);
trainersRouter.post("/", workshopsController.create);
trainersRouter.put("/", workshopsController.update);
trainersRouter.delete("/:id", workshopsController.delete);
trainersRouter.get("/trainer/:id", workshopsController.getAllByTrainer);

export default trainersRouter;
