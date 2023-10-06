import { Sequelize } from "sequelize";
import { environment } from "../environment/loadEnvironments.js";

const { dbUrl } = environment;

const sequelize = new Sequelize(dbUrl);

export default sequelize;
