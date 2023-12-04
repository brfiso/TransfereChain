import { RefreshTokensStore, UsersStore } from "./types"
import { v4 as uuid } from 'uuid'

export const users: UsersStore = new Map()

export const tokens: RefreshTokensStore = new Map()

export function createRefreshToken(cpf: string) {
  const currentUserTokens = tokens.get(cpf) ?? []
  const refreshToken = uuid()

  tokens.set(cpf, [...currentUserTokens, refreshToken])

  return refreshToken;
}

export function checkRefreshTokenIsValid(cpf: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(cpf) ?? []

  return storedRefreshTokens.some(token => token === refreshToken)
}

export function invalidateRefreshToken(cpf: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(cpf) ?? []

  tokens.set(cpf, storedRefreshTokens.filter(token => token !== refreshToken));
}