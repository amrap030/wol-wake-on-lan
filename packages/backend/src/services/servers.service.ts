import wol from "wol";
import serverModel from "@/models/servers.model";
import { Server, WakeupParams } from "@interfaces/servers.interface";
import { HttpException } from "@/exceptions/HttpException";
import { isMacAddress, getNetworkConfig } from "@/utils/network";

/**
 * Get all servers
 */
export const getServers = async () => {
  const servers: Server[] = serverModel;

  servers.forEach((server) => delete server.password);

  return servers;
};

/**
 * Wake up server
 */
export const wakeup = async (params: WakeupParams) => {
  const { macAddress, password } = params;

  if (!isMacAddress(macAddress))
    throw new HttpException(400, "Not a valid MAC Address");

  const server = serverModel.find((server) => server.macAddress === macAddress);
  if (!server) throw new HttpException(400, "Unknown MAC Address");
  if (server.password !== password)
    throw new HttpException(400, "Incorrect password");

  const config = await getNetworkConfig(macAddress);

  wol.wake(macAddress, config, function (err) {
    if (err) throw new HttpException(400, err);
    else return;
  });
};

export default { getServers, wakeup };
