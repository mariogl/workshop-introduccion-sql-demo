import { type Request, type Response } from "express";
import { type TrainerStructure } from "../types";
import Trainer from "../model/Trainer/Trainer.js";
import { type Model } from "sequelize";

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

      const newTrainer = await Trainer.create<Model<TrainerStructure>>(
        newTrainerData
      );

      res.status(201).json({ trainer: newTrainer });
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

      const { password, ...rest } = trainer;

      res.status(200).json({ trainer: rest });
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

      const deletedTrainers = await Trainer.destroy({
        where: { id: trainerId },
      });

      if (deletedTrainers === 0) {
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
