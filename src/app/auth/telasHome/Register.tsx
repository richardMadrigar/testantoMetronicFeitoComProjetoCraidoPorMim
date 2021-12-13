import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../setup/api'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import clsx from 'clsx'
import { AuthContext } from '../../../context/authContext'



const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Quantidade de caracteres inválido")
    .max(60, "Limite máximo de 60 caracteres")
    .required('Esse campo é obrigatório'),
  email: Yup.string()
    .email('Formato de E-mail inválido')
    .min(8, ' "Quantidade de caracteres inválido"')
    .max(100, "Limite máximo de 100 caracteres")
    .required('Esse campo é obrigatório'),
  celular: Yup.string()
    .min(8, "Quantidade de caracteres inválido")
    .max(20, "Limite máximo de 20 caracteres")
    .required('Esse campo é obrigatório'),
  whats: Yup.string()
    .min(8, "Quantidade de caracteres inválido")
    .max(20, "Limite máximo de 20 caracteres")
    .required('Esse campo é obrigatório'),
  cpf: Yup.string()
    .min(11, "Quantidade de caracteres inválido")
    .max(11, "Limite máximo de 11 caracteres")
    .required('Esse campo é obrigatório'),
  rg: Yup.string()
    .min(9, "Quantidade de caracteres inválido")
    .max(9, "Limite máximo de 9 caracteres")
    .required('Esse campo é obrigatório'),
  pix: Yup.string()
    .min(3, "Quantidade de caracteres inválido")
    .max(30, 'Maximum 50 symbols')
    .required('Esse campo é obrigatório'),
  nascimento: Yup.string()
    .min(3, "Quantidade de caracteres inválido")
    .max(10, 'Maximum 50 symbols')
    .required('Esse campo é obrigatório'),
  nitpis: Yup.string()
    .min(11, "Precisa ter 11 caracteres")
    .max(11, "Limite máximo de 11 caracteres")
    .required('Esse campo é obrigatório'),
  nomedamae: Yup.string()
    .min(3, "Quantidade de caracteres inválido")
    .max(60, "Limite máximo de 60 caracteres")
    .required('Esse campo é obrigatório'),
  banco: Yup.string()
    .min(2, "Quantidade de caracteres inválido")
    .max(10, "Limite máximo de 3 caracteres")
    .required('Esse campo é obrigatório'),
  agencia: Yup.string()
    .min(2, "Quantidade de caracteres inválido")
    .max(10, "Limite máximo de 10 caracteres")
    .required('Esse campo é obrigatório'),
  conta: Yup.string()
    .min(2, 'Minimum 8 symbols')
    .max(15, "Limite máximo de 15 caracteres")
    .required('Esse campo é obrigatório'),
  cep: Yup.string()
    .min(5, 'Minimum 8 symbols')
    .max(15, "Limite máximo de 15 caracteres")
    .required('Esse campo é obrigatório'),
  numero: Yup.string()
    .min(3, 'Minimum 8 symbols')
    .max(6, "Limite máximo de 6 caracteres")
    .required('Esse campo é obrigatório'),
  senha: Yup.string()
    .min(8, "Senha minima de 8 caracteres")
    .max(20, "Limite máximo de 20 caracteres")
    .required('Esse campo é obrigatório'),
  confsenha: Yup.string()
    .required('É necessário confimar a senha ')
    .when('senha', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('senha')], "Senha não corresponde"),
    }),
  check: Yup.bool().required('Você deve aceitar os Termos e Condições'),
})



export function Register() {
  const [loading, setLoading] = useState(false)

  const { setAutorization, setUserPerfil } = useContext(AuthContext)


  const handleRegister = async (data: {}) => {
    await api.post('/users', data)
      .then((response) => {
        alert("Usuário criado com sucesso!")
        const { token } = response.data;

        localStorage.setItem('token', token);

        setUserPerfil(response.data)
        setAutorization(true)

      }).catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <Formik

        initialValues={{
          name: '',
          email: '',
          celular: '',
          whats: '',
          cpf: '',
          rg: '',
          pix: '',
          nascimento: '',
          nitpis: '',
          nomedamae: '',
          banco: '',
          agencia: '',
          conta: '',
          cep: '',
          numero: '',
          senha: '',
          confsenha: '',
          check: false,
        }}

        validationSchema={registrationSchema}

        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          setLoading(true)
          console.log(values);

          try {
            handleRegister(values)
          } catch (error) {
            alert("erro ao fazer login: " + error)
          }
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }}

      >

        {({ errors, touched, isValid }) => (

          <Form autoComplete='false'>
            {/* begin::Heading */}
            <div className='mb-5 text-center'>

              <h1 className='text-dark mb-3'> Cadastre -se</h1>

              {/* begin::Link */}
              <div className='text-gray-500 fw-bold fs-4'>
                Já tem uma conta ?
                <Link to='/auth/login' className='link-primary fw-bolder ' style={{ marginLeft: '.7rem' }}>
                  Fazer Login
                </Link>
              </div>
            </div>
            {/* end::Link */}

            {/* end::Heading */}



            <div className='d-flex align-items-center mb-5'>
              <div className='border-bottom border-gray-300 mw-50 w-100'></div>
              <span className='fw-bold text-gray-400 fs-7 mx-2'>OU</span>
              <div className='border-bottom border-gray-300 mw-50 w-100'></div>
            </div>


            {/* begin::Form group Nome completo */}
            <div className='fv-row '>
              <label className='form-label fw-bolder text-dark fs-6'>Nome completo</label>

              <Field
                placeholder='Nome'
                type='text'
                autoComplete='off'
                name="name"
                className={clsx('form-control form-control-lg form-control-solid',
                  { 'is-invalid': touched.name && errors.name },
                  { 'is-valid': touched.name && !errors.name, }
                )}
              />
              <div className="text-danger">
                <ErrorMessage name="name" />
              </div>

            </div>
            {/* end::Form group */}


            {/* begin::Form group Email */}
            <div className='fv-row mt-5' >

              <label className='form-label fw-bolder text-dark fs-6'>Email</label>

              <Field
                placeholder='email'
                name="email"
                type="text"
                autoComplete='false'
                className={clsx('form-control form-control-lg form-control-solid',
                  { 'is-invalid': touched.email && errors.email },
                  { 'is-valid': touched.email && !errors.email, }
                )}
              />
              <div className="text-danger">
                <ErrorMessage name="email" />
              </div>
            </div>
            {/* end::Form group */}





            {/* begin::Form group Celular */}
            <div className='row fv-row mt-5'>

              <div className='col-xl-6 mb-5'>
                <label className='class="form-label fw-bolder text-dark fs-6'>Celular</label>
                <Field
                  placeholder='Celular'
                  autoComplete='on'
                  name="celular"
                  className={clsx('form-control form-control-lg form-control-solid',
                    { 'is-invalid': touched.celular && errors.celular, },
                    { 'is-valid': touched.celular && !errors.celular, }
                  )}
                />
                <div className="text-danger">
                  <ErrorMessage name="celular" />
                </div>
              </div>

              {/* begin::Form group Whatsapp */}
              <div className='col-xl-6'>
                <label className='class="form-label fw-bolder text-dark fs-6'>Whatsapp</label>
                <Field
                  placeholder='Whatsapp'
                  // autoComplete=''
                  name="whats"
                  className={clsx('form-control form-control-lg form-control-solid',
                    { 'is-invalid': touched.whats && errors.whats, },
                    { 'is-valid': touched.whats && !errors.whats, }
                  )}
                />
                <ErrorMessage name="whats" />
              </div>

            </div>
            {/* end::Form group */}


            {/* begin::Form group CPF */}
            <div className='fv-row mt-5'>
              <label className='form-label fw-bolder text-dark fs-6'>CPF</label>
              <Field
                placeholder='CPF'
                // autoComplete='off'
                name="cpf"
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  { 'is-invalid': touched.cpf && errors.cpf },
                  { 'is-valid': touched.cpf && !errors.cpf, }
                )}
              />
              <div className="text-danger">
                <ErrorMessage name="cpf" />
              </div>
            </div>
            {/* end::Form group */}


            {/* begin::Form group RG */}
            <div className='fv-row mt-4'>
              <label className='form-label fw-bolder text-dark fs-6'>RG</label>
              <Field
                placeholder='RG'
                name="rg"
                className={clsx('form-control form-control-lg form-control-solid',
                  { 'is-invalid': touched.rg && errors.rg },
                  { 'is-valid': touched.rg && !errors.rg, }
                )}
              />
              <div className="text-danger">
                <ErrorMessage name="rg" />
              </div>
            </div>
            {/* end::Form group */}


            {/* begin::Form group Data De nascimento */}
            <div className='fv-row mt-4'>
              <label className='form-label fw-bolder text-dark fs-6'>Data de nascimento</label>
              <Field
                placeholder='Data de nascimento'
                name="nascimento"
                className={clsx('form-control form-control-lg form-control-solid',
                  { 'is-invalid': touched.nascimento && errors.nascimento },
                  { 'is-valid': touched.nascimento && !errors.nascimento, }
                )}
              />
              <div className="text-danger">
                <ErrorMessage name="nascimento" />
              </div>
            </div>
            {/* end::Form group */}



            <div className='fv-row mt-4'> {/* begin::Form group Pix */}
              <label className='form-label fw-bolder text-dark fs-6'>Pix</label>
              <Field
                placeholder='Pix'
                name="pix"
                className={clsx('form-control form-control-lg form-control-solid',
                  { 'is-invalid': touched.pix && errors.pix },
                  { 'is-valid': touched.pix && !errors.pix, }
                )}
              />
              <div className="text-danger">
                <ErrorMessage name="pix" />
              </div>
            </div> {/* end::Form group */}



            <div className='fv-row mt-4'>   {/* begin::Form group Nit / Pis */}
              <label className='form-label fw-bolder text-dark fs-6'>Nit / Pis</label>
              <Field
                placeholder='Nit / Pis'
                name="nitpis"
                className={clsx('form-control form-control-lg form-control-solid',
                  { 'is-invalid': touched.nitpis && errors.nitpis },
                  { 'is-valid': touched.nitpis && !errors.nitpis, }
                )}
              />
              <div className="text-danger">
                <ErrorMessage name="nitpis" />
              </div>
            </div> {/* end::Form group */}



            <div className='fv-row mt-4'>     {/* begin::Form group Nome da Mãe */}
              <label className='form-label fw-bolder text-dark fs-6'>Nome da mãe</label>
              <Field
                placeholder='Nome da mãe'
                name="nomedamae"
                className={clsx('form-control form-control-lg form-control-solid',
                  { 'is-invalid': touched.nomedamae && errors.nomedamae },
                  { 'is-valid': touched.nomedamae && !errors.nomedamae, }
                )}
              />
              <div className="text-danger">
                <ErrorMessage name="nomedamae" />
              </div>
            </div>   {/* end::Form group */}



            {/* begin::Form group Nome da Agência / Banco / Conta */}


            <div className='row fv-row mt-5'>

              <div className='col-xl-4 mb-5'>  {/* begin::Form group Banco */}
                <label className='class="form-label fw-bolder text-dark fs-6'>Banco</label>
                <Field
                  placeholder='Banco'
                  name="banco"
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    { 'is-invalid': touched.banco && errors.banco, },
                    { 'is-valid': touched.banco && !errors.banco, }
                  )}
                />
                <div className="text-danger">
                  <ErrorMessage name="banco" />
                </div>
              </div>


              <div className='col-xl-4'>   {/* begin::Form group Agência */}
                <label className='class="form-label fw-bolder text-dark fs-6'>Agência</label>
                <Field
                  placeholder='Agência'
                  name="agencia"
                  className={clsx('form-control form-control-lg form-control-solid',
                    { 'is-invalid': touched.agencia && errors.agencia, },
                    { 'is-valid': touched.agencia && !errors.agencia, }
                  )}
                />
                <div className="text-danger">
                  <ErrorMessage name="agencia" />
                </div>
              </div>



              <div className='col-xl-4'>    {/* begin::Form group Conta */}
                <label className='class="form-label fw-bolder text-dark fs-6'>Conta</label>
                <Field
                  placeholder='Conta'
                  name="conta"
                  className={clsx('form-control form-control-lg form-control-solid',
                    { 'is-invalid': touched.conta && errors.conta, },
                    { 'is-valid': touched.conta && !errors.conta, }
                  )}
                />
                <div className="text-danger">
                  <ErrorMessage name="conta" />
                </div>
              </div>

            </div>
            {/* end::Form group */}




            <div className='row fv-row mt-4'> {/* begin::Form group CEP */}

              <div className='col-xl-6'>
                <label className='class="form-label fw-bolder text-dark fs-6'>CEP</label>
                <Field
                  placeholder='CEP'
                  name="cep"
                  className={clsx('form-control form-control-lg form-control-solid',
                    { 'is-invalid': touched.cep && errors.cep, },
                    { 'is-valid': touched.cep && !errors.cep, }
                  )}
                />
                <div className="text-danger">
                  <ErrorMessage name="cep" />
                </div>
              </div>



              <div className='col-xl-6'>    {/* begin::Form group Número */}
                <label className='class="form-label fw-bolder text-dark fs-6'>Número</label>
                <Field
                  placeholder='Número'
                  name="numero"
                  className={clsx('form-control form-control-lg form-control-solid',
                    { 'is-invalid': touched.numero && errors.numero, },
                    { 'is-valid': touched.numero && !errors.numero, }
                  )}
                />
                <ErrorMessage name="numero" />
              </div>
            </div>    {/* end::Form group */}





            {/* begin::Form group Senha */}
            <div className='mt-5 fv-row' data-kt-password-meter='true'>
              <div className='mb-1'>
                <label className='form-label fw-bolder text-dark fs-6'>Senha</label>
                <div className='position-relative mb-3'>
                  <Field
                    type='password'
                    placeholder='Senha'
                    autocomplete="new-password"
                    name='senha'
                    className={clsx('form-control form-control-lg form-control-solid',
                      { 'is-invalid': touched.senha && errors.senha, },
                      { 'is-valid': touched.senha && !errors.senha, }
                    )}
                  />
                  <div className="text-danger">
                    <ErrorMessage name="senha" />
                  </div>
                </div>
              </div>
            </div>
            {/* end::Form group */}


            <div className='fv-row mt-5 mb-10'>{/* begin::Form group Confirm password */}
              <label className='form-label fw-bolder text-dark fs-6'>Confirmar senha</label>
              <Field
                // type='password'
                placeholder='Confirmar senha'
                name='confsenha'
                className={clsx('form-control form-control-lg form-control-solid',
                  { 'is-invalid': touched.confsenha && errors.confsenha, },
                  { 'is-valid': touched.confsenha && !errors.confsenha, }
                )}
              />
              <div className="text-danger">
                <ErrorMessage name="confsenha" />
              </div>
            </div>    {/* end::Form group */}





            {/* begin::Form group */}
            <div className='fv-row mb-10'>
              <div className='form-check form-check-custom form-check-solid'>
                <Field
                  className='form-check-input'
                  type='checkbox'
                  id='kt_login_toc_agree'
                  name='check'
                />
                <label
                  className='form-check-label fw-bold text-gray-700 fs-6'
                  htmlFor='kt_login_toc_agree me-3'
                >
                  Eu concordo
                  <Link to='/auth/terms' className='ms-1 link-primary'>
                    Termos e Condições
                  </Link>
                  .
                </label>
                {touched.check && errors.check && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{errors.check}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* end::Form group */}


            {/* begin::  -- Buttons --  */}
            <div className='text-center'>
              <button
                type='submit'
                className='btn btn-lg btn-light-dark w-100 mb-5'
                disabled={!isValid}
              // disabled={isSubmitting || !isValid}
              // disabled={!isValid}
              >
                {!loading && <span className='indicator-label'>Registrar-se</span>}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Um momento...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>

              <Link to='/auth/login'>
                <button type='button' className='btn btn-lg btn-light-dark w-100 mb-5'>
                  Cancel
                </button>
              </Link>
            </div>


          </Form>
        )}
      </Formik>
    </>
  )
}
