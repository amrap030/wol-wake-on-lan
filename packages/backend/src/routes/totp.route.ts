import { Router } from "express";
import TotpController from "@controllers/totp.controller";

/**
 * Creates totp routes
 *
 * @returns {Router} - Express router
 */
const totpRouter = () => {
  const router = Router();

  router.post(
    "/verify",
    async (req, res, next) => await TotpController.enable2fa(req, res, next)
  );

  return router;
};

export default totpRouter;
