import { cleanEnv, host, port, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ["development", "test", "production"] }),
    PORT: port(),
    LOG_DIR: str(),
    LOG_FORMAT: str({ choices: ["dev", "combined"] }),
    MAC_ADDRESS: str(),
    ORIGIN: process.env.NODE_ENV === "production" ? host() : str(),
    SERVER: str(),
    PASSWORD: str(),
  });
};

export default validateEnv;
