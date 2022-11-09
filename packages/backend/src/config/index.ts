import { config } from "dotenv";
import { validateEnv } from "@/utils/validateEnv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SERVER,
  MAC_ADDRESS,
  PASSWORD,
  DB_DIR,
  IP_ADDRESS,
} = validateEnv();
