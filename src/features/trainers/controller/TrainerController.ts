import { type Request, type Response } from "express";
import { type Model } from "sequelize";
import { type TrainerStructure } from "../types";
import Trainer from "../model/Trainer.js";

class TrainerController {
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const trainers = await Trainer.findAll();

      res.status(200).json({ trainers });
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
      const trainerId = req.params.id;

      const trainer = await Trainer.findByPk(trainerId);

      if (!trainer) {
        res.status(404).json({ msg: "Trainer not found" });
        return;
      }

      res.status(200).json({ trainer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

  public async create(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      TrainerStructure
    >,
    res: Response
  ): Promise<void> {
    try {
      const newTrainerData = req.body;

      const existingUser = await Trainer.findOne({
        where: { username: newTrainerData.username },
      });

      if (existingUser) {
        res.status(409).json({ msg: "Username already exists" });
        return;
      }

      const newTrainer = await Trainer.create<Model<TrainerStructure>>(
        newTrainerData
      );

      const createdTrainerData: Partial<TrainerStructure> =
        newTrainer.dataValues;

      delete createdTrainerData.password;

      res.status(201).json({ trainer: createdTrainerData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

  public async update(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      TrainerStructure
    >,
    res: Response
  ): Promise<void> {
    try {
      const trainer = req.body;

      const [updatedTrainers] = await Trainer.update(trainer, {
        where: { id: trainer.id },
      });

      if (updatedTrainers === 0) {
        res.status(404).json({ msg: "Trainer not found" });
        return;
      }

      delete (trainer as Partial<TrainerStructure>).password;

      res.status(200).json({ trainer });
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
      const trainerId = req.params.id;

      const trainersDeleted = await Trainer.destroy({
        where: { id: trainerId },
      });

      if (trainersDeleted === 0) {
        res.status(404).json({ msg: "Trainer not found" });
        return;
      }

      res.status(200).json({ msg: "Trainer deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
}

export default TrainerController;
