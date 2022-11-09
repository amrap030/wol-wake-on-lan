import wol from "wol";
import serverModel from "@/models/servers.model";
import { db } from "@/database/totp.database";
import { Server, WakeupParams } from "@interfaces/servers.interface";
import { HttpException } from "@/exceptions/HttpException";
import { isMacAddress, getNetworkConfig } from "@/utils/network";
import { verifyToken } from "@/utils/totp";
import ping from "ping";
import servers from "@/models/servers.model";

/**
 * Get all servers
 */
export const getServers = async (): Promise<
  {
    name: string;
    macAddress: string;
    id: number;
  }[]
> => {
  const servers: Server[] = serverModel;
  return servers.map((server) => ({
    name: server.name,
    macAddress: server.macAddress,
    id: server.id,
  }));
};

/**
 * Wake up server
 */
export const wakeup = async (params: WakeupParams) => {
  const { macAddress, password, token } = params;
  console.log(params);

  if (!isMacAddress(macAddress))
    throw new HttpException(400, "Not a valid MAC Address");

  const server = serverModel.find((server) => server.macAddress === macAddress);
  console.log(password);

  console.log(server.password);
  if (!server) throw new HttpException(400, "Unknown MAC Address");
  if (server.password !== password)
    throw new HttpException(400, "Incorrect password");

  const is2faEnabled: boolean = await db.getData("/enabled");
  if (!is2faEnabled) throw new HttpException(400, "2fa currently not enabled");

  const isVerified = await verifyToken(token);
  if (!isVerified) throw new HttpException(400, "Invalid token");

  const config = await getNetworkConfig(macAddress);

  wol.wake(macAddress, config, function (err) {
    if (err) throw new HttpException(400, err);
    else return;
  });
};

/**
 * Ping server to check if server is alive
 */
export const pingServer = async (hostId: string): Promise<boolean> => {
  const server = servers.find((server: Server) => server.id === Number(hostId));
  if (server) {
    const pingResult = await ping.promise.probe(server.ipAddress);
    return pingResult.alive;
  }
  return false;
};

export default { getServers, wakeup, pingServer };
