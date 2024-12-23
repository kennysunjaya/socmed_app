import jwt from "jsonwebtoken";

const secret_key = process.env.SECRET_KEY;

export const signToken = (payload) => {
  return jwt.sign(payload, secret_key);
};

export const verifyToken = (access_token) => {
  return jwt.verify(access_token, secret_key);
};
