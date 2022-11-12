import { Request } from "express";

export interface Server {
  name: string;
  password: string;
  macAddress: string;
  id: number;
  ipAddress: string;
  broadcastIp?: string;
}

export interface WakeupParams {
  macAddress: string;
  password: string;
  token: string;
}

export interface RequestWithServer extends Request {
  server: Server;
}
