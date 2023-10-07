import { Sequelize } from "sequelize";
import { environment } from "../environment/loadEnvironments.js";

const sequelize = new Sequelize(environment.dbUrl);

export default sequelize;
