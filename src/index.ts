import sequelize from "./db/index.js";
import { environment } from "./environment/loadEnvironments.js";
import app from "./server/index.js";
import chalk from "chalk";

const { port } = environment;

app.listen(port, () => {
  console.log(chalk.blue(`Server listening on http://localhost:${port}`));
});

try {
  await sequelize.authenticate();
} catch (error: unknown) {
  console.error("Unable to connect to the database:", error);
}
