import React, { FC, useContext } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { MasterInit } from '../../_metronic/layout/MasterInit'
import { AuthPage } from '../auth'

import { ErrorsPage } from '../pages/TelaErrors/ErrorsPage'

import { PrivateRoutes } from './PrivateRoutes'

const Routes: FC = () => {
  const { loading, autorization } = useContext(AuthContext)


  if (loading) {
    return <h1>loading...</h1>
  }

  return (
    <>
      <Switch>
        {!autorization ? ( //se false
          /*Render auth page when user at `/auth` and not authorized.*/
          <Route>
            <AuthPage />
          </Route>
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from='/auth' to='/' />
        )}

        <Route path='/error' component={ErrorsPage} />

        {!autorization ? (
          <Redirect to='/auth/login' />
        ) : (
          <>
            <MasterLayout>
              <PrivateRoutes />
            </MasterLayout>
          </>
        )}
      </Switch>
      <MasterInit />
    </>
  )
}

export { Routes }
