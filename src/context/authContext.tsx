import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IUsers } from "../types/TypeModels";
import api, { SECRET } from "../setup/api";

import { verify } from 'jsonwebtoken'


type AuthContextType = {
  handleLogin: (data: {}) => Promise<void>

  setAutorization: React.Dispatch<React.SetStateAction<boolean>>
  autorization: boolean

  setNewImage: React.Dispatch<React.SetStateAction<boolean>>
  newImage: boolean

  setUserPerfil: any
  userPerfil: IUsers | undefined;

  token: TokenState;
  loading: boolean
};

type AuthContextProviderProps = {
  children: ReactNode;
};

interface TokenState {
  token: string;
}


export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps) {

  const [autorization, setAutorization] = useState(true)
  const [loading, setLoading] = useState(false)

  const [userPerfil, setUserPerfil] = useState() //dados do usuario logado

  const [newImage, setNewImage] = useState(false)

  const [token, setToken] = useState<TokenState>(() => {
    const token = localStorage.getItem("token")

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`
      return { token }
    }
    return {} as TokenState;
  })



  useEffect(() => {
    const resetUser = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setAutorization(false)
        return console.log('Você não tem um token')
      }
      api.defaults.headers.authorization = `Bearer ${token}`

      try {
        setLoading(true)

        await api.post('/sessions')
          .then(response => {
            console.log("usuario logado: ", response.data);
            setUserPerfil(response.data)

            setLoading(false)
            setAutorization(true)
          })

      } catch (error) {
        console.log('Token invalido')
        localStorage.removeItem('token')
        setLoading(false)
        setAutorization(false)
      }
    }
    resetUser()
  }, [token, newImage]);


  useEffect(() => {
    const testTokenValid = async () => {
      const token = localStorage.getItem('token')
      api.defaults.headers.authorization = `Bearer ${token}`

      if (!token) {
        setAutorization(false)
        return console.log('voce não tem um token')
      }

      try {
        const resultToken = verify(token, SECRET)
        // console.log(resultToken);

        if (!resultToken) {
          console.log('Token invalido')
          return setAutorization(false)
        }

        return setAutorization(true)
      } catch (error) {
        console.log('Token invalido ')
      }
    }
    testTokenValid()
  }, [token, newImage]);


  const handleLogin = async (data: {}) => {
    console.log(data)
    await api.post('/login', data)

      .then(response => {
        const { token } = response.data;

        setToken(token)
        localStorage.setItem('token', token);

        const resultToken = verify(token, SECRET)

        if (!resultToken) {
          return alert('Token invalido')
        }

        api.defaults.headers.authorization = `Bearer ${token}`

        setUserPerfil(response.data)
        setAutorization(true)

      }).catch((error) => {
        alert(error);
      });
  }


  return (
    <AuthContext.Provider value={{ loading, token, userPerfil, setUserPerfil, autorization, setAutorization, handleLogin, setNewImage, newImage }}>
      {props.children}
    </AuthContext.Provider>
  );
}\
