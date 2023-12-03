import jwt from 'jsonwebtoken'

import { auth } from './config';
import { createRefreshToken } from './database';

export function generateJwtAndRefreshToken(cpf: string, payload: object = {}) {
  const token = jwt.sign(payload, auth.secret, {
    subject: cpf,
    expiresIn: 60 * 60 * 60, 
  });

  const refreshToken = createRefreshToken(cpf)

  return {
    token,
    refreshToken,
  }
}