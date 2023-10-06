import { type Request, type Response } from "express";
import { type Model } from "sequelize";
import { type WorkShopStructure } from "../types";
import Workshop from "../model/Workshop.js";

class WorkShopController {
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const workshops = await Workshop.findAll();

      res.status(200).json({ workshops });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

  public async getAllByTrainer(req: Request<{ id: string }>, res: Response) {
    try {
      const trainerId = req.params.id;

      const workshops = await Workshop.findAll({
        where: { trainer_id: trainerId },
      });

      res.status(200).json({ workshops });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

  public async getById(
    req: Request<
      { id: string },
      Record<string, unknown>,
      Record<string, unknown>
    >,
    res: Response
  ): Promise<void> {
    try {
      const workshopId = req.params.id;

      const workshop = await Workshop.findByPk(workshopId);

      if (!workshop) {
        res.status(404).json({ msg: "Workshop not found" });
        return;
      }

      res.status(200).json({ workshop });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

  public async create(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      WorkShopStructure
    >,
    res: Response
  ): Promise<void> {
    try {
      const newWorkshopData = req.body;

      const newWorkshop = await Workshop.create<Model<WorkShopStructure>>(
        newWorkshopData
      );

      res.status(201).json({ workshop: newWorkshop });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

  public async update(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      WorkShopStructure
    >,
    res: Response
  ): Promise<void> {
    try {
      const workshop = req.body;

      const [updatedWorkshops] = await Workshop.update(workshop, {
        where: { id: workshop.id },
      });

      if (updatedWorkshops === 0) {
        res.status(404).json({ msg: "Workshop not found" });
        return;
      }

      res.status(200).json({ workshop });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

  public async delete(
    req: Request<
      { id: string },
      Record<string, unknown>,
      Record<string, unknown>
    >,
    res: Response
  ): Promise<void> {
    try {
      const workshopId = req.params.id;

      const workshopsDeleted = await Workshop.destroy({
        where: { id: workshopId },
      });

      if (workshopsDeleted === 0) {
        res.status(404).json({ msg: "Workshop not found" });
        return;
      }

      res.status(200).json({ msg: "Workshop deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
}

export default WorkShopController;
