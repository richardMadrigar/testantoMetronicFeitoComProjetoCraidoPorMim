import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'


import PainelDeControle from '../pages/newPages/TelasSistema/PainelDeControle'
import Usuarios from '../pages/newPages/TelasSistema/Usuarios'
import ExtratoRecebimentos from '../pages/newPages/TelasSistema/ExtratoRecebimentos'


export function PrivateRoutes() {
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/painel' component={PainelDeControle} />
        <Route path='/usuarios' component={Usuarios} />
        <Route path='/recebimentos' component={ExtratoRecebimentos} />
        <Route path='/eventos' component={() => <h1> eventos   </h1>} />
        <Route path='/documentos' component={() => <h1> documentos  </h1>} />
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
