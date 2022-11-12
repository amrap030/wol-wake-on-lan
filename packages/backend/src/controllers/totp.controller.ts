import totpService from "@services/totp.service";
import type { NextFunction, Request, Response } from "express";
import type { TotpBody } from "@/interfaces/totp.interface";

/**
 * Verifies incoming totp token and enables 2fa if valid
 */
export const enable2fa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body as TotpBody;
  try {
    await totpService.enable2fa(token);
    return res.status(200).end();
  } catch (e: any) {
    next(e);
  }
};

export default { enable2fa };
