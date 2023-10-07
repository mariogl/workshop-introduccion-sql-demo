import { DataTypes } from "sequelize";
import sequelize from "../../../../db/index.js";

const Trainer = sequelize.define(
  "Trainer",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
