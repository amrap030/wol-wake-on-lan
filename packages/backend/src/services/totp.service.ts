import { db } from "@/database/totp.database";
import { HttpException } from "@/exceptions/HttpException";
import type { Secret } from "@/interfaces/totp.interface";
import { verifyToken } from "@/utils/totp";

/**
 * verify totp token
 */
export const enable2fa = async (token: string) => {
  const secret: Secret = await db.getData("/secret");
  const isVerified = await verifyToken(token);
  if (!isVerified) throw new HttpException(403, "Invalid totp");
  await db.push("/", { secret, enabled: true });
};

export default { enable2fa };
