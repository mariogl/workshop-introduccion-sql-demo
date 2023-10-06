import sequelize from "./db/index.js";
import { environment } from "./environment/loadEnvironments.js";
import app from "./server/index.js";
import chalk from "chalk";

const { port } = environment;

try {
  app.listen(port, () => {
    console.log(chalk.blue(`Server listening on http://localhost:${port}`));
  });
  await sequelize.authenticate();
  console.log(chalk.green("Successfully connected to database"));
} catch (error: unknown) {
  console.log(chalk.red("Error connecting to database:"), error);
}
