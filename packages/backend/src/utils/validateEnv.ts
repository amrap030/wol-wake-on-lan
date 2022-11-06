import { cleanEnv, host, port, str } from "envalid";

export const validateEnv = () => {
  return cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["production", "development"],
      default: "production",
      devDefault: "development",
    }),
    PORT: port({ default: 3000 }),
    LOG_DIR: str({ default: "/var/log/wol", devDefault: "../logs" }),
    LOG_FORMAT: str({
      choices: ["dev", "combined"],
      default: "combined",
      devDefault: "dev",
    }),
    MAC_ADDRESS: str(),
    ORIGIN: process.env.NODE_ENV === "development" ? str() : host(),
    SERVER: str(),
    PASSWORD: str(),
    DB_DIR: str({ default: "/var/db/wol", devDefault: "." }),
  });
};

export default validateEnv;
