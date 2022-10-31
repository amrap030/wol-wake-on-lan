import { Request } from "express";

export interface Server {
  name: string;
  password: string;
  macAddress: string;
  broadcastIp?: string;
}

export interface WakeupParams {
  macAddress: string;
  password: string;
}

export interface RequestWithServer extends Request {
  server: Server;
}
