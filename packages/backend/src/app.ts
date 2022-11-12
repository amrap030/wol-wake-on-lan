import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN } from "@config";
import serversRouter from "@routes/servers.route";
import totpRouter from "@routes/totp.route";
import errorMiddleware from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";
import path from "path";
import { initDB } from "@/database/totp.database";
import qrcodeTerminal from "qrcode-terminal";
import speakeasy from "speakeasy";
import type { Secret } from "@/interfaces/totp.interface";
import { db } from "@/database/totp.database";

initDB();

const initializeMiddlewares = (): void => {
  app.use(morgan(LOG_FORMAT, { stream }));
  app.use(cors({ origin: ORIGIN, credentials: true }));
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};

const initializeRoutes = (): void => {
  app.use("/v1/servers", serversRouter());
  app.use("/v1/totp", totpRouter());
  app.use(express.static(path.join(__dirname, "../frontend")));
};

const initializeSwagger = (): void => {
  const options = {
    swaggerDefinition: {
      info: {
        title: "REST API",
        version: "1.0.0",
        description: "Example docs",
      },
    },
    apis: ["swagger.yaml"],
  };

  const specs = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

const initializeErrorHandling = (): void => {
  app.use(errorMiddleware);
};

const setup2fa = async (): Promise<Secret> => {
  try {
    const currentSecret: Secret = await db.getData("/secret");
    return currentSecret;
  } catch (e: any) {
    const secret: Secret = speakeasy.generateSecret();
    await db.push("/", { secret, enabled: false });
    return secret;
  }
};

const app = express();

initializeMiddlewares();
initializeRoutes();
initializeSwagger();
initializeErrorHandling();

app.listen(PORT || 3000, async () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port ${PORT || 3000}`);
  logger.info(`=================================`);

  logger.info(`=================================`);
  logger.info(`======= OTP AUTH =======`);
  const secret: Secret = await setup2fa();
  logger.info(`==== SECRET: ${secret.base32} ====`);
  qrcodeTerminal.generate(secret.otpauth_url, { small: true });
  logger.info(`=================================`);
});
