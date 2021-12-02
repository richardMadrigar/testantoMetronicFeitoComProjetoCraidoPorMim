import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IUsers } from "../types/TypeModels";
import api, { SECRET } from "../setup/api";

import {verify} from 'jsonwebtoken'
// import { verify } from 'jsonwebtoken'



type AuthContextType = {
  userPerfil: IUsers | undefined;
  setUserPerfil: any
  autorization: boolean
  setAutorization: React.Dispatch<React.SetStateAction<boolean>>
  handleLogin: (data: {}) => Promise<void>
  token: TokenState;
  loading: boolean
  att: boolean
  setAtt: React.Dispatch<React.SetStateAction<boolean>>
  modalDelete: boolean
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>
  modalEdit: boolean
};

type AuthContextProviderProps = {
  children: ReactNode;
};

interface TokenState {
  token: string;
}


export const AuthContext = createContext({} as AuthContextType);


// component Provider
export function AuthContextProvider(props: AuthContextProviderProps) {
  const [autorization, setAutorization] = useState(false)
  const [loading, setLoading] = useState(false)

  const [modalDelete, setModalDelete] = useState(false) //modal deletar
  const [modalEdit, setModalEdit] = useState(false) //modal editar usuario
                      
  const [att, setAtt] = useState(false) //itens por pagina

  const [userPerfil, setUserPerfil] = useState() //dados do usuario logado

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
      // console.log(token);
      

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
        setLoading(false)
        console.log('Token invalido ')
      }
    }
    resetUser()
  }, [token]);


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
  }, [token]);




  const handleLogin = async (data: {}) => {
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
    <AuthContext.Provider value={{modalEdit, setModalEdit, modalDelete, setModalDelete, att, setAtt, loading, token, userPerfil, setUserPerfil, autorization, setAutorization, handleLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}