/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Redirect, Switch, useHistory } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'


const ErrorsPage: React.FC = () => {
  const history = useHistory()

  const redirectToDashboard = () => {
    history.push('/')
  }

  return (
    <div className='d-flex flex-column flex-root'>
      <div className='d-flex flex-column flex-column-fluid text-center p-20 py-lg-20'>

        <a href='/dashboard' className='mb-10 pt-lg-20'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/logoImg.png')} //logo da empresa na pagina de erro
            className='h-150px mb-5'
          />
        </a>

        <div className='pt-lg-10 mb-10'>
          <Switch>
            <Redirect from='/error' exact={true} to='/error/404' />
            <Redirect to='/error/404' />
          </Switch>

          <div className='text-center'>
            <a onClick={redirectToDashboard} className='btn btn-lg btn-primary fw-bolder'>
              Ir para Painel de controle
            </a>
          </div>
        </div>


      </div>
    </div>

  )
}

export { ErrorsPage }
