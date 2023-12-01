import { api, signOut } from "@/services/api";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { parseCookies, setCookie } from 'nookies';
import axios from "axios";

type User = {
  cpf: string
  nome: string
  roles: string[]
}

type SignInCredentials = {
  cpf: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | undefined
  isAuthenticated: boolean
  navigateTo: (path: string) => void; // Adicionando a função navigateTo
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const {'tesouroBtAuth.token': token} = parseCookies()

    if(token) {
      api.get('/me').then(response => {
        const {cpf, nome, roles} = response.data

        setUser({cpf, nome, roles})
      }).catch(_ =>{
          signOut()
      })
    }
  }, [])

  async function signIn({ cpf, password }: SignInCredentials): Promise<void> {
    try {
      const response = await api.post("sessions", {
        cpf,
        password
      });

      const { token, refreshToken, roles, nome } = response.data;

      setCookie(undefined, "tesouroBtAuth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/"
      });

      setCookie(undefined, "tesouroBtAuth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/"
      });

      setUser({
        cpf,
        nome,
        roles
      });

      const authenticatedApi = axios.create({
        baseURL: "http://localhost:3333",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigateTo("/programas/listar");

    } catch (err) {
      console.log(err);
    }
  }

  const navigateTo = (path: string) => {
    window.location.href = path; 
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, navigateTo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
