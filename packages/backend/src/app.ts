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
import errorMiddleware from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";
import validateEnv from "@utils/validateEnv";
import path from "path";

validateEnv();

const initializeMiddlewares = () => {
  app.use(morgan(LOG_FORMAT, { stream }));
  app.use(cors({ origin: ORIGIN, credentials: true }));
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};

const initializeRoutes = () => {
  app.use("/v1/servers", serversRouter());
  app.use(express.static(path.join(__dirname, "../frontend")));
};

const initializeSwagger = () => {
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

const initializeErrorHandling = () => {
  app.use(errorMiddleware);
};

const app = express();

initializeMiddlewares();
initializeRoutes();
initializeSwagger();
initializeErrorHandling();

app.listen(PORT || 3000, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port ${PORT || 3000}`);
  logger.info(`=================================`);
});
