import jwt from "jsonwebtoken";
import { Role } from "../interfaces/IRole";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está configurado");
}

interface TokenPayload {
  userId: string;
  role: Role;
}

const generate_token = (userId: string, role: Role): string => {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
};

const verify_token = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    JWT_SECRET
  ) as TokenPayload;
};

export {
  generate_token,
  verify_token,
};