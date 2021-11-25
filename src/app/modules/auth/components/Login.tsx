import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

// // import { useDispatch } from 'react-redux'

// import * as auth from '../redux/AuthRedux'
import { login } from '../redux/AuthCRUD'


import { useFormik } from 'formik'
import * as Yup from 'yup'

import { AuthContext } from '../../../../context/authContext'



const loginSchema = Yup.object().shape({
  cpf: Yup.string()
    .min(11, "Quantidade caracteres invalido")
    .max(11, "Limite máximo de 11 caracteres")
    .required('Esse campo é obrigatório'),
  senha: Yup.string()
    .min(5, "Senha minima de 5 caracteres")
    .max(20, "Limite máximo de 20 caracteres")
    .required('Esse campo é obrigatório'),
})

const initialValues = {
  cpf: '',
  senha: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)

  const { handleLogin } = useContext(AuthContext)

  // const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,

    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)

      console.log(values);

      handleLogin(values)

      setTimeout(() => {
        login(values.cpf, values.senha)
        // .then(({ data: { accessToken } }) => {
        //   setLoading(false)
        //   dispatch(auth.actions.login(accessToken))
        // })
        // .catch(() => {
        //   setLoading(false)
        //   setSubmitting(false)
        //   setStatus('The login detail is incorrect')
        // })
      }, 1000)
    },
  })


  return (

    <form className='form  fv-plugins-bootstrap5 fv-plugins-framework '
      onSubmit={formik.handleSubmit}
      id='kt_login_signin_form'
    >
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3 '>Faça seu login ✔️</h1>
      </div>


      {/* begin::input Login*/}
      <div className='fv-row mb-10'>

        <label className='form-label fs-6 fw-bolder text-dark'>CPF</label>

        <input
          placeholder='CPF'
          {...formik.getFieldProps('cpf')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.cpf && formik.errors.cpf },
            {
              'is-valid': formik.touched.cpf && !formik.errors.cpf,
            }
          )}
          type='CPF'
          name='cpf'
          autoComplete='off'
        />
        {formik.touched.cpf && formik.errors.cpf && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.cpf}</span>
          </div>
        )}

      </div>
      {/* end::input Login */}

      {/* begin::input senha */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>

          <div className='d-flex flex-stack mb-2'>

            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Senha</label>
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{ marginLeft: '5px' }}
            >
              Esqueceu a senha ?
            </Link>
          </div>
        </div>

        <input
          type='password' autoComplete='off'
          placeholder='Senha'
          {...formik.getFieldProps('senha')}

          className={clsx(
            'form-control form-control-lg form-control-solid w-100',
            {
              'is-invalid': formik.touched.senha && formik.errors.senha,
            },
            {
              'is-valid': formik.touched.senha && !formik.errors.senha,
            }
          )}
        />

        {formik.touched.senha && formik.errors.senha && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.senha}</span>
            </div>
          </div>
        )}

      </div>
      {/* end::input senha */}



      {/* begin::Buttons */}
      <button
        className='btn btn-lg  btn-light-dark w-100 mb-5'
        type="submit"
        disabled={formik.isSubmitting || !formik.isValid}
      >

        {!loading && <span className='indicator-label'>Login</span>}
        {loading && (
          <span className='indicator-progress' style={{ display: 'block' }}>
            Um momento...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        )}
      </button>


      <div className='d-flex align-items-center mb-5'>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
        <span className='fw-bold text-gray-400 fs-7 mx-2'>OU</span>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
      </div>


      <Link to='/auth/registration'>
        <button type='button' className='btn btn-lg btn-light-dark w-100 mb-5'>
          <span className='indicator-label'>Criar conta</span>
        </button>
      </Link>

      {/* end::Buttons */}
    </form>
  )
}
