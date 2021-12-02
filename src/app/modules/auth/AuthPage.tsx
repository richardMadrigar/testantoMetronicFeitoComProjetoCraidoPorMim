/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'


import { Register } from './components/Register'
import { Login } from './components/Login'
import NewLogin from './components/NreLogin'






export function AuthPage() {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>

        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logoImg.png')} className='h-80px' />
        </a>

        <div className='w-lg-500px  bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Switch>
            <Route path='/auth/novoForm' component={NewLogin} />
            <Route path='/auth/login' component={Login} />
            <Route path='/auth/registration' component={Register} />
            <Redirect from='/auth' exact={true} to='/auth/login' />
            <Redirect to='/auth/login' />
          </Switch>
        </div>
      </div>
    </div>
  )
}
