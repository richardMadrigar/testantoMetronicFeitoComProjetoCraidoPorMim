import React from 'react'

interface IText {
  notificacao: string
}

function UltimasNotificacoesComp({ notificacao }: IText) {
  return (
    <>
      <div className="list-group-item p-7  ">
        <a href="https://google.com.br" className="text-dark">{notificacao}</a>
      </div>
    </>
  )
}

export default UltimasNotificacoesComp
