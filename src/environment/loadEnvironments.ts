/* eslint-disable no-console */
import dotenv from "dotenv";
import envSchema from "./schema.js";

dotenv.config();

const envValidationResult = envSchema.validate(process.env);

if (envValidationResult.error) {
  console.error("\u001b[31mMissing environmental variables\u001b[0m");
  console.error(`\u001b[31m${envValidationResult.error.message}\u001b[0m`);
  process.exit(1);
}

const { PORT: port, DB_URL: dbUrl } = process.env;

export const environment = {
  dbUrl: dbUrl!,
  port: Number(port),
};
