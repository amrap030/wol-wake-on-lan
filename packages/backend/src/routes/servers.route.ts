import { Router } from "express";
import ServersController from "@controllers/servers.controller";

/**
 * Creates server routes
 *
 * @returns {Router} - Express router
 */
const serversRouter = () => {
  const router = Router();

  router.get(
    "/",
    async (req, res, next) => await ServersController.getServers(req, res, next)
  );

  router.post(
    "/wakeonlan",
    async (req, res, next) => await ServersController.wakeup(req, res, next)
  );

  router.post(
    "/ping/:id",
    async (req, res, next) => await ServersController.ping(req, res, next)
  );

  return router;
};

export default serversRouter;
