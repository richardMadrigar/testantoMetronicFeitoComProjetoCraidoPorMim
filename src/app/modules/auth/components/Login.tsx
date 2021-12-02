import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'


import { Field, Form, Formik, useFormik, ErrorMessage } from 'formik'
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


  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: loginSchema,

  //   onSubmit: (values) => {
  //     setLoading(true)
  //     console.log(values);

  //     try {
  //       handleLogin(values)
  //     } catch (error) {
  //       alert("ocorreu um erro no seu login: " + error)
  //     }

  //     setTimeout(() => {
  //       setLoading(false)
  //     }, 1000)
  //   },
  // })


  return (

    <Formik

      initialValues={{
        cpf: '',
        senha: '',
      }}

      validationSchema={loginSchema}

      onSubmit={values => {
        setLoading(true)
        console.log(values);

        try {
          handleLogin(values)
        } catch (error) {
          alert("ocorreu um erro no seu login: " + error)
        }

        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }}
    >

      {({ errors, touched }) => (

        <Form> 


          <div className='form  fv-plugins-bootstrap5 fv-plugins-framework '>
            <div className='text-center mb-10'>
              <h1 className='text-dark mb-3 '>Faça seu login ✔️</h1>
            </div>



            {/* begin::input Login*/}
            <div className='fv-row mb-10'>

              <label className='justify-content-between fw-bolder text-dark fs-6 mb-2'>CPF</label>

              <Field
                name="cpf"
                className={clsx(
                  'form-control form-control-lg form-control-solid w-100',
                  {
                    'is-invalid': touched.senha && errors.senha,
                  },
                  {
                    'is-valid': touched.senha && !errors.senha,
                  }
                )}
              />

              {errors.cpf && touched.cpf ? (
                <div>{errors.cpf}</div>
              ) : <> </>}

              {/* <ErrorMessage
                name="cpf"
                component="div"
                className="field-error"
              /> */}

            </div>
            {/* end::input Login */}


            {/* begin::input senha */}
            <div className='fv-row mb-10'>

              <div className='d-flex justify-content-between mt-n5'>
                <div className='d-flex flex-stack mb-2'>

                  <label className='form-label fw-bolder text-dark fs-6 mb-0'>Senha</label>

                  <Link to='/auth/forgot-password' className='link-primary fs-6 fw-bolder ms-3' >
                    Esqueceu a senha ?
                  </Link>

                </div>
              </div>

              <Field
                type="password"
                name="senha"
                className={clsx(
                  'form-control form-control-lg form-control-solid w-100',
                  {
                    'is-invalid': touched.senha && errors.senha,
                  },
                  {
                    'is-valid': touched.senha && !errors.senha,
                  }
                )}
              />
              <ErrorMessage
                name="senha"
                component="div"
              />
              {touched.senha && errors.senha && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{errors.senha}</span>
                  </div>
                </div>
              )}

            </div>
            {/* end::input senha */}






            {/* begin::Buttons */}
            <button
              type="submit"
              className='btn btn-lg  btn-light-dark w-100 mb-5'
            // disabled={!formik.isValid}
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
          </div>

        </Form>
      )}

    </Formik >

  );
}


