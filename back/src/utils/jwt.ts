import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está configurado");
}

interface TokenPayload {
  userId: number;
}

const generate_token = (userId: number): string => {
  return jwt.sign(
    { userId },
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