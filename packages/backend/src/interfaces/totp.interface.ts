export interface Secret {
  ascii: string;
  hex: string;
  base32: string;
  otpauth_url: string;
}

export interface TotpBody {
  token: string;
}
