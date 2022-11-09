import { Server } from "@interfaces/servers.interface";
import { SERVER, MAC_ADDRESS, PASSWORD, IP_ADDRESS } from "@config";

const servers: Server[] = SERVER.split(",").map((server, index) => ({
  name: server,
  password: PASSWORD.split(",")[index],
  macAddress: MAC_ADDRESS.split(",")[index],
  ipAddress: IP_ADDRESS.split(",")[index],
  id: index,
}));

export default servers;
