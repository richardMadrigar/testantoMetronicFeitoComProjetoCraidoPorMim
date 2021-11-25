import React, { FC, useContext, useEffect, useState } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { MasterInit } from '../../_metronic/layout/MasterInit'
import { AuthPage } from '../modules/auth'

import { ErrorsPage } from '../modules/errors/ErrorsPage'

import { PrivateRoutes } from './PrivateRoutes'

const Routes: FC = () => {
  const { autorization, setAutorization, setUserPerfil } = useContext(AuthContext)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // const resultToken = localStorage.getItem('token')
    const resultUsers = localStorage.getItem('users')

    if (resultUsers) {
      const resUsers = JSON.parse(resultUsers)
      console.log(' usuario ', resUsers);

      setUserPerfil(resUsers)
      setAutorization(true)
    }
    setLoading(false)
  }, [setAutorization, setUserPerfil])

  

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
          /*Redirect to `/auth` when user is not authorized*/
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
