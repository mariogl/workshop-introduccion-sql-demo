/* eslint-disable @typescript-eslint/naming-convention */
import Joi from "joi";

const envSchema = Joi.object({
  PORT: Joi.string().required(),
  DB_URL: Joi.string().required(),
}).unknown();

export default envSchema;
