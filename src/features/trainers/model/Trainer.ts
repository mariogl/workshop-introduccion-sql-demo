import { DataTypes } from "sequelize";
import sequelize from "../../../db/index.js";

const Trainer = sequelize.define(
  "Trainer",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
  },
  {
    tableName: "trainers",
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

export default Trainer;
