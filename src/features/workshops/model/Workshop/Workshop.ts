import { DataTypes } from "sequelize";
import sequelize from "../../../../db/index.js";

const Workshop = sequelize.define(
  "Workshop",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    duration_in_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
