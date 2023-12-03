import { api, signOut } from "@/services/api";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { parseCookies, setCookie } from 'nookies';
import axios from "axios";

type User = {
  cpf: string
  nome: string
  role: string
  wallet: string
}

type SignInCredentials = {
  cpf: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | undefined
  isAuthenticated: boolean
  navigateTo: (path: string) => void;
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
        const {cpf, nome, role, wallet} = response.data

        setUser({cpf, nome, role, wallet})
      }).catch( _ =>{
        signOut()
      })
    }
  }, [])

  async function signIn({ cpf, password }: SignInCredentials): Promise<void> {
    try {
      const response = await api.post("Sessions", {
        cpf,
        password
      });

      const { token, refreshToken, role, nome, wallet } = response.data;

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
        role,
        wallet
      });

      axios.create({
        baseURL: "http://localhost:3333",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.data?.role === "administrador") {
        navigateTo("/admin/dashboard");
      } else if(response.data.role === "parlamentar") {
        navigateTo("/emendas/listar");
      } else if(response.data.role === "beneficiario") {
        navigateTo("/programas/listar");
      } else {
        navigateTo("/transferenciasEspeciais/listar");
      }
  

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
