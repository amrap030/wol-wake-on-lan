import { WakeupParams } from "@interfaces/servers.interface";
import serverService from "@services/servers.service";
import type { NextFunction, Request, Response } from "express";

/**
 * Get Servers
 */
export const getServers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const servers = await serverService.getServers();
    return res.status(200).json(servers);
  } catch (e: any) {
    next(e);
  }
};

/**
 * Wakeup server
 */
export const wakeup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: WakeupParams = req.body;
  try {
    await serverService.wakeup(data);
    return res.status(204).end();
  } catch (e: any) {
    next(e);
  }
};

/**
 * Ping server
 */
export const ping = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const isAlive = await serverService.pingServer(id);
    return res.status(200).json(isAlive);
  } catch (e: any) {
    next(e);
  }
};

export default { getServers, wakeup, ping };
