import React, { createContext, ReactNode, useState } from "react";


type AuthContextTypee = {
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>
  modalDelete: boolean

  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>
  modalEdit: boolean

  setAtt: React.Dispatch<React.SetStateAction<boolean>>
  att: boolean

};

type AuthContextProviderProps = {
  children: ReactNode;
};



export const SettingsProvider = createContext({} as AuthContextTypee);


export function SettingsProviderContext(props: AuthContextProviderProps) {

  const [modalDelete, setModalDelete] = useState(false) //modal deletar
  const [modalEdit, setModalEdit] = useState(false) //modal editar usuario

  const [att, setAtt] = useState(false) //itens por pagina


  return (
    <SettingsProvider.Provider value={{ modalEdit, setModalEdit, modalDelete, setModalDelete, att, setAtt }}>
      {props.children}
    </SettingsProvider.Provider>
  );
}