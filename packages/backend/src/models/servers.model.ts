import { Server } from "@interfaces/servers.interface";
import { SERVER, MAC_ADDRESS, PASSWORD } from "@config";

const servers: Server[] = SERVER.split(",").map((server, index) => ({
  name: server,
  password: PASSWORD.split(",")[index],
  macAddress: MAC_ADDRESS.split(",")[index],
}));

export default servers;
