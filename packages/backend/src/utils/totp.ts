import { db } from "@/database/totp.database";
import { Secret } from "@/interfaces/totp.interface";
import speakeasy from "speakeasy";

export const verifyToken = async (token: string) => {
  const secret: Secret = await db.getData("/secret");
  const { base32 } = secret;
  const isVerified: boolean = speakeasy.totp.verify({
    secret: base32,
    encoding: "base32",
    token,
  });
  return isVerified;
};
