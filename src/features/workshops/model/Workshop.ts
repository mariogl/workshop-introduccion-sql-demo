import { DataTypes } from "sequelize";
import sequelize from "../../../db/index.js";

const Workshop = sequelize.define(
  "Workshop",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration_in_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    slots: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Trainer",
        key: "id",
      },
    },
  },
  {
    tableName: "workshops",
    timestamps: false,
  }
);

export default Workshop;
