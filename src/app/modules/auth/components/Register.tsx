/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../../setup/api'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import clsx from 'clsx'
import { AuthContext } from '../../../../context/authContext'


const initialValues = {
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
}

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Quantidade de caracteres inválido")
    .max(60, "Limite máximo de 60 caracteres")
    .required('Esse campo é obrigatório'),
  email: Yup.string()
    .email('Wrong email format')
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
    .max(10, 'Maximum 50 symbols'),
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

  
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,

    onSubmit: (values) => {
      setLoading(true)
      console.log(values);

      handleRegister(values)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    },
  })

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
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-5 text-center'>

        <h1 className='text-dark mb-3'>Cadastre-se</h1>

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

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}


      {/* begin::Form group Nome completo */}
      <div className='fv-row '>
        <label className='form-label fw-bolder text-dark fs-6'>Nome completo</label>
        <input
          placeholder='Nome completo'
          type=''
          // autoComplete='off'
          {...formik.getFieldProps('name')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.name && formik.errors.name },
            {
              'is-valid': formik.touched.name && !formik.errors.name,
            }
          )}
        />
        {formik.touched.name && formik.errors.name && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.name}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}


      {/* begin::Form group Email */}
      <div className='fv-row mt-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          // autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}



      {/* begin::Form group Celular */}
      <div className='row fv-row mt-5'>

        <div className='col-xl-6 mb-5'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Celular</label>
          <input
            placeholder='Celular'
            type='tel'
            // autoComplete='off'
            {...formik.getFieldProps('celular')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.celular && formik.errors.celular,
              },
              {
                'is-valid': formik.touched.celular && !formik.errors.celular,
              }
            )}
          />
          {formik.touched.celular && formik.errors.celular && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.celular}</span>
              </div>
            </div>
          )}
        </div>

        {/* begin::Form group Whatsapp */}
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Whatsapp</label>
          <input
            placeholder='Whatsapp'
            type='tel'
            // autoComplete='off'
            {...formik.getFieldProps('whats')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.whats && formik.errors.whats,
              },
              {
                'is-valid': formik.touched.whats && !formik.errors.whats,
              }
            )}
          />
          {formik.touched.whats && formik.errors.whats && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.whats}</span>
              </div>
            </div>
          )}
        </div>

      </div>
      {/* end::Form group */}


      {/* begin::Form group CPF */}
      <div className='fv-row mt-5'>
        <label className='form-label fw-bolder text-dark fs-6'>CPF</label>
        <input
          placeholder='CPF'
          type=''
          // autoComplete='off'
          {...formik.getFieldProps('cpf')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.cpf && formik.errors.cpf },
            {
              'is-valid': formik.touched.cpf && !formik.errors.cpf,
            }
          )}
        />
        {formik.touched.cpf && formik.errors.cpf && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.cpf}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}


      {/* begin::Form group RG */}
      <div className='fv-row mt-4'>
        <label className='form-label fw-bolder text-dark fs-6'>RG</label>
        <input
          placeholder='RG'
          type=''
          // autoComplete='off'
          {...formik.getFieldProps('rg')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.rg && formik.errors.rg },
            {
              'is-valid': formik.touched.rg && !formik.errors.rg,
            }
          )}
        />
        {formik.touched.rg && formik.errors.rg && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.rg}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}


      {/* begin::Form group Data De nascimento */}
      <div className='fv-row mt-4'>
        <label className='form-label fw-bolder text-dark fs-6'>Data de nascimento</label>
        <input
          placeholder='Data de nascimento'
          type=''
          // autoComplete='off'
          {...formik.getFieldProps('nascimento')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.nascimento && formik.errors.nascimento },
            {
              'is-valid': formik.touched.nascimento && !formik.errors.nascimento,
            }
          )}
        />
        {formik.touched.nascimento && formik.errors.nascimento && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.nascimento}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}


      {/* begin::Form group Pix */}
      <div className='fv-row mt-4'>
        <label className='form-label fw-bolder text-dark fs-6'>Pix</label>
        <input
          placeholder='Pix'
          type=''
          // autoComplete='off'
          {...formik.getFieldProps('pix')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.pix && formik.errors.pix },
            {
              'is-valid': formik.touched.pix && !formik.errors.pix,
            }
          )}
        />
        {formik.touched.pix && formik.errors.pix && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.pix}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Nit / Pis */}
      <div className='fv-row mt-4'>
        <label className='form-label fw-bolder text-dark fs-6'>Nit / Pis</label>
        <input
          placeholder='Nit / Pis'
          type=''
          // autoComplete='off'
          {...formik.getFieldProps('nitpis')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.nitpis && formik.errors.nitpis },
            {
              'is-valid': formik.touched.nitpis && !formik.errors.nitpis,
            }
          )}
        />
        {formik.touched.nitpis && formik.errors.nitpis && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.nitpis}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Nome da Mãe */}
      <div className='fv-row mt-4'>
        <label className='form-label fw-bolder text-dark fs-6'>Nome da mãe</label>
        <input
          placeholder='Nome da mãe'
          type=''
          // autoComplete='off'
          {...formik.getFieldProps('nomedamae')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.nomedamae && formik.errors.nomedamae },
            {
              'is-valid': formik.touched.nomedamae && !formik.errors.nomedamae,
            }
          )}
        />
        {formik.touched.nomedamae && formik.errors.nomedamae && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.nomedamae}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}


      {/* begin::Form group Nome da Agência / Banco / Conta */}

      {/* begin::Form group Banco */}
      <div className='row fv-row mt-5'>

        <div className='col-xl-4 mb-5'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Banco</label>
          <input
            placeholder='Banco'
            type=''
            // autoComplete='off'
            {...formik.getFieldProps('banco')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.banco && formik.errors.banco,
              },
              {
                'is-valid': formik.touched.banco && !formik.errors.banco,
              }
            )}
          />
          {formik.touched.banco && formik.errors.banco && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.banco}</span>
              </div>
            </div>
          )}
        </div>

        {/* begin::Form group Agência */}
        <div className='col-xl-4'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Agência</label>
          <input
            placeholder='Agência'
            type=''
            // autoComplete='off'
            {...formik.getFieldProps('agencia')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.agencia && formik.errors.agencia,
              },
              {
                'is-valid': formik.touched.agencia && !formik.errors.agencia,
              }
            )}
          />
          {formik.touched.agencia && formik.errors.agencia && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.agencia}</span>
              </div>
            </div>
          )}
        </div>

        {/* begin::Form group Conta */}
        <div className='col-xl-4'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Conta</label>
          <input
            placeholder='Conta'
            type=''
            // autoComplete='off'
            {...formik.getFieldProps('conta')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.conta && formik.errors.conta,
              },
              {
                'is-valid': formik.touched.conta && !formik.errors.conta,
              }
            )}
          />
          {formik.touched.conta && formik.errors.conta && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.conta}</span>
              </div>
            </div>
          )}
        </div>

      </div>
      {/* end::Form group */}



      {/* begin::Form group CEP */}
      <div className='row fv-row mt-4'>

        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>CEP</label>
          <input
            placeholder='CEP'
            type=''
            // autoComplete='off'
            {...formik.getFieldProps('cep')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.cep && formik.errors.cep,
              },
              {
                'is-valid': formik.touched.cep && !formik.errors.cep,
              }
            )}
          />
          {formik.touched.cep && formik.errors.cep && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.cep}</span>
              </div>
            </div>
          )}
        </div>


        {/* begin::Form group Número */}
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Número</label>
          <input
            placeholder='Número'
            type=''
            // autoComplete='off'
            {...formik.getFieldProps('numero')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.numero && formik.errors.numero,
              },
              {
                'is-valid': formik.touched.numero && !formik.errors.numero,
              }
            )}
          />
          {formik.touched.numero && formik.errors.numero && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.numero}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* end::Form group */}



      {/* begin::Form group Senha */}
      <div className='mt-5 fv-row' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Senha</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Senha'
              // autoComplete='off'
              {...formik.getFieldProps('senha')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
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
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mt-5 mb-10'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirmar senha</label>
        <input
          type='password'
          placeholder='Confirmar senha'
          autoComplete='off'
          {...formik.getFieldProps('confsenha')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.confsenha && formik.errors.confsenha,
            },
            {
              'is-valid': formik.touched.confsenha && !formik.errors.confsenha,
            }
          )}
        />
        {formik.touched.confsenha && formik.errors.confsenha && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.confsenha}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}




      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='form-check form-check-custom form-check-solid'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('check')}
          />
          <label
            className='form-check-label fw-bold text-gray-700 fs-6'
            htmlFor='kt_login_toc_agree'
          >
            Eu concordo {' '}
            <Link to='/auth/terms' className='ms-1 link-primary'>
              Termos e Condições
            </Link>
            .
          </label>
          {formik.touched.check && formik.errors.check && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.check}</span>
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
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Registrar-se</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>


        <Link to='/auth/login'>
          <button
            type='button'
            className='btn btn-lg btn-light-dark w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::button Registrar */}
    </form>
  )
}
