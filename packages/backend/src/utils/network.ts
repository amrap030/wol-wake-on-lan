import network, { Interface } from "network";

const macAddressRegex =
  /^[0-9a-f]{1,2}([\.:-])(?:[0-9a-f]{1,2}\1){4}[0-9a-f]{1,2}$/;

export const isMacAddress = (address: string) => macAddressRegex.test(address);

const getNumericalIP = (ip: string) => {
  const parts: string[] = ip.split(".");
  let result = 0;
  for (let i = 0; i < 4; i++) {
    result = (result | (parseInt(parts[i]) << ((3 - i) * 8))) >>> 0;
  }
  return result;
};

const getPrefix = (subnetMaskNumeric: number) => {
  let prefix = 0;
  do {
    subnetMaskNumeric = (subnetMaskNumeric << 1) >>> 0;
    prefix++;
  } while ((subnetMaskNumeric & 0x80000000) >>> 0 !== 0);
  return prefix;
};

const u = (n) => {
  return n >>> 0;
};

const ip = (n) => {
  return [
    (n >>> 24) & 0xff,
    (n >>> 16) & 0xff,
    (n >>> 8) & 0xff,
    (n >>> 0) & 0xff,
  ].join(".");
};

const getNetwork = async (
  iface: Interface
): Promise<{ address: string; port: number }> => {
  const addr = iface.ip_address + getPrefix(getNumericalIP(iface.netmask));
  const addr_parts = addr.match(/\d+/g); // -> example: [ '198', '162', '1', '1', '24' ]
  const addr32 = addr_parts.slice(0, 4).reduce(function (a, o) {
    return u(+a << 8) + +o;
  }); // 0xc6a20101
  const mask = u(~0 << (32 - +addr_parts[4])); // -> example: 0xffffff00
  // const start = ip(u(addr32 & mask)); // -> example: 198.162.1.0
  const broadcast = ip(u(Number(addr32) | ~mask)); // -> example: 198.162.1.255

  return { address: broadcast, port: 9 };
};

export const getNetworkConfig = async (
  macAddress: string
): Promise<{ address: string; port: number } | undefined> => {
  const ifaces: Interface[] = await new Promise((resolve, reject) => {
    network.get_interfaces_list(function (err, list) {
      if (err) {
        reject(err);
        return;
      }
      resolve(list);
    });
  });

  for (const iface of ifaces) {
    if (!iface || !iface.ip_address || !iface.netmask) {
      continue;
    }
    if (macAddress.toLowerCase() === iface.mac_address.toLowerCase()) {
      const { address, port } = await getNetwork(iface);
      return { address, port };
    }
  }
};
