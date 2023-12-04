import { api, signOut } from "@/services/api";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { parseCookies, setCookie } from 'nookies';
import axios from "axios";

export type User = {
  cpf: string
  nome: string
  role: string
  wallet?: string
  cnpj?: string
}

type SignInCredentials = {
  cpf: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  userAccess(role: string): void;
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
        const {cpf, nome, role, wallet, cnpj} = response.data

        setUser({cpf, nome, role, wallet, cnpj})
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

      const { token, refreshToken, role, nome, wallet, cnpj } = response.data;

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
        wallet,
        cnpj
      });

      axios.create({
        baseURL: "http://localhost:3333",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.role)

      if(response.data?.role === "administrador") {
        navigateTo("/admin/dashboard");
      } else if(response.data.role === "parlamentar") {
        navigateTo("/emendas/listar");
      } else if(response.data.role === "beneficiário") {
        navigateTo("/programas/listar");
      } else {
        navigateTo("/transferenciasEspeciais/listar");
      }
  

    } catch (err) {
      console.log(err);
    }
  }

  async function userAccess(role: string){
    const { user, isAuthenticated } = useContext(AuthContext)

    if(!isAuthenticated){
        return navigateTo("/")
    }

    if(user?.role != role){
      return navigateTo("/")
    }
  }

  const navigateTo = (path: string) => {
    window.location.href = path; 
  };

  return (
    <AuthContext.Provider value={{ signIn, userAccess, isAuthenticated, user, navigateTo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
