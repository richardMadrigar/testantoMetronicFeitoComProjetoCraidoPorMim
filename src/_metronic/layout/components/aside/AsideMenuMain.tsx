import React from 'react'

import { AsideMenuItem } from './AsideMenuItem'

export function AsideMenuMain() {

  return (
    <>
      <AsideMenuItem
        to='/painel'
        icon='/media/icons/duotune/general/gen001.svg'
        title={'Painel de controle ' }
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/usuarios'
        icon='/media/icons/duotune/general/gen049.svg'
        title={'Usuários '}
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/recebimentos'
        icon='/media/icons/duotune/graphs/gra001.svg'
        title={'Extrato de recebimentos '}
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/eventos'
        icon='/media/icons/duotune/graphs/gra012.svg'
        title={'Extrato de evento/mês ' }
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/documentos'
        icon='/media/icons/duotune/files/fil016.svg'
        title={'Meus documentos ' }
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/notificacoes'
        icon='/media/icons/duotune/general/gen007.svg'
        title={'Minha notificaçoes ' }
        fontIcon='bi-app-indicator'
      />
    </>
  )
}


