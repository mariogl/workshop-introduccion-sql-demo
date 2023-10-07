import { Router } from "express";
import WorkShopController from "../controller/WorkshopsController.js";

const workshopsRouter = Router();

const workshopsController = new WorkShopController();

workshopsRouter.get("/", workshopsController.getAll);
workshopsRouter.get("/:id", workshopsController.getById);
workshopsRouter.post("/", workshopsController.create);
workshopsRouter.put("/", workshopsController.update);
workshopsRouter.delete("/:id", workshopsController.delete);
workshopsRouter.get("/trainer/:id", workshopsController.getAllByTrainer);

export default workshopsRouter;
