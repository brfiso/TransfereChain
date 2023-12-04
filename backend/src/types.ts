export type CreateSessionDTO = {
  cpf: string;
  password: string;
}

type UserData = {
  password: string;
  nome: string;
  role: string;
  wallet?: string;
  cnpj?: string;
}

export type UsersStore = Map<string, UserData>

export type RefreshTokensStore = Map<string, string[]>

export type DecodedToken = {
  sub: string;
}