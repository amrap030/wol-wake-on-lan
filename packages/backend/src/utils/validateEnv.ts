import { cleanEnv, host, port, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "test", "production"],
      default: "development",
    }),
    PORT: port({ default: 3000 }),
    LOG_DIR: str({ default: "/var/log/wol" }),
    LOG_FORMAT: str({ choices: ["dev", "combined"], default: "dev" }),
    MAC_ADDRESS: str(),
    ORIGIN: process.env.NODE_ENV === "production" ? host() : str(),
    SERVER: str(),
    PASSWORD: str(),
  });
};

export default validateEnv;
