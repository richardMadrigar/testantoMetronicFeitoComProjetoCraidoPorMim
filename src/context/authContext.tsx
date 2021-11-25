import React, { createContext, ReactNode, useState } from "react";
import { IUsers } from "../types/TypeModels";
import api from "../setup/api";


type AuthContextType = {
  userPerfil: IUsers | undefined;
  setUserPerfil: any
  autorization: boolean
  setAutorization: React.Dispatch<React.SetStateAction<boolean>>
  handleLogin: (data: {}) => Promise<void>
  token: TokenState;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

interface TokenState {
  token: string;
}


// Exportando contexto
export const AuthContext = createContext({} as AuthContextType);


// Exportando component contexto provider
export function AuthContextProvider(props: AuthContextProviderProps) {

  const [userPerfil, setUserPerfil] = useState() //dados do usuario logado
  const [autorization, setAutorization] = useState(false)


  const [token, setToken] = useState<TokenState>(() => {
    const token = localStorage.getItem("token")

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return { token }
    }

    return {} as TokenState;
  })


  const handleLogin = async (data: {}) => {
    await api.post('/login', data)

      .then(response => {
        const { token } = response.data;
        setToken(token)

        localStorage.setItem('token', token);
        localStorage.setItem('users', JSON.stringify(response.data));

        api.defaults.headers.authorization = `Bearer ${token}`

        setUserPerfil(response.data)
        setAutorization(true)

      }).catch((error) => {
        alert(error);
      });
  }



  return (
    <AuthContext.Provider value={{ token, userPerfil, setUserPerfil, autorization, setAutorization, handleLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}