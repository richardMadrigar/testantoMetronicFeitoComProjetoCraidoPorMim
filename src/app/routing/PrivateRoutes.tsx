import React, { Suspense } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'

import ExtratoRecebimentos from '../pages/TelasSistema/ExtratoRecebimentos'
import PainelDeControle from '../pages/TelasSistema/PainelDeControle'
import Documentos from '../pages/TelasSistema/Documentos'
import Usuarios from '../pages/TelasSistema/Usuarios'


export function PrivateRoutes() {
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/painel' component={PainelDeControle} />
        <Route path='/usuarios' component={Usuarios} />
        <Route path='/recebimentos' component={ExtratoRecebimentos} />
        <Route path='/eventos' component={() => <h1> eventos   </h1>} />
        <Route path='/documentos' component={Documentos} />
        <Route path='/notificacoes' component={() => <h1> notificações   </h1>} />

        <Redirect from='/auth' to='/usuarios' />
        <Redirect exact from='/' to='/painel' />

        <Redirect from='/auth' to='/painel' />
        <Redirect exact from='/' to='/painel' />

        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
