import React, { useContext } from 'react';

// import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Field, Form, Formik } from 'formik';
import clsx from 'clsx';

import { AuthContext } from '../../../../context/authContext';
import * as Yup from "yup";

// import { AuthContext } from '../../../../context/authContext';



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


const NewLogin = () => {

  // const { handleLogin } = useContext(AuthContext)


  const {  setModalEdit } = useContext(AuthContext)



  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: registrationSchema,

  //   onSubmit: (values: any) => {
  //     // console.log(values);
  //     handleMoldalEdit(values)

  //     setTimeout(() => {
  //     }, 1000)
  //   },
  // })


  const handleMoldalEdit = async (data: {}) => {
    console.log(data);
    // console.log("id dentro da funcao ", userId);

    // await api.put(`/users/${userId}`, data)
    //   .then((response) => {
    //     console.log(response.data);
    //     setAtt(!att)
    //   })
    //   .catch(error => alert('Erro ao requisitar o servidor para pegar usuários! ' + error))

    setModalEdit(false)
  }



  const loading = false



  return (

    <>

      <Formik

        validationSchema={registrationSchema}
        initialValues={{
          name: '',
          email: '',
          celular: '',
          whats: '',
          cpf: '',
          rg: '',
          nascimento: '',
          nitpis: '',
          nomedamae: '',
          pix: '',
          banco: '',
          agencia: '',
          conta: '',
          cep: '',
          numero: ''
          // name: dataEdit.name,
          // email: dataEdit.email,
          // celular: dataEdit.celular,
          // whats: dataEdit.whats,
          // cpf: dataEdit.cpf,
          // rg: dataEdit.rg,
          // nascimento: dataEdit.nascimento,
          // nitpis: dataEdit.nitpis,
          // nomedamae: dataEdit.nomedamae,
          // pix: dataEdit.pix,
          // banco: dataEdit.banco,
          // agencia: dataEdit.agencia,
          // conta: dataEdit.conta,
          // cep: dataEdit.cep,
          // numero: dataEdit.numero
        }}

        onSubmit={(values, actions) => {
          handleMoldalEdit(values)
          actions.setSubmitting(false);
        }}

      >

        {({ errors, touched, isValid }) => (

          <Form>

            {/* {modalEdit && <div className="drawer-overlay" />} */}

            {/* <div className="modal fade show" style={{ display: modalEdit ? 'block' : 'none' }}  > */}
            <div className="modal-dialog modal-dialog-centered mw-850px">
              <div className="modal-content">

                {/* <form onSubmit={formik.handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework" > */}

                <div className="modal-header" >
                  <h2>Editar usuário</h2>

                  <button type="button" onClick={() => setModalEdit(false)} style={{ border: 'none' }} className="btn btn-icon btn-bg-light">
                    <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                      <span className="svg-icon svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                          <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                        </svg>
                      </span>
                    </div>
                  </button>

                </div>

                <div className="modal-body py-10 px-lg-17">
                  <div className="scroll-y me-n7 pe-7" id="kt_modal_new_address_scroll" data-kt-scroll="true" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_new_address_header" data-kt-scroll-wrappers="#kt_modal_new_address_scroll" data-kt-scroll-offset="300px" >

                    {/* begin::Form group Nome completo */}
                    <div className='fv-row '>
                      <label className='form-label fw-bolder text-dark fs-6'>Nome completo</label>

                      <Field
                        placeholder='Nome'
                        type=''
                        // autoComplete='off'
                        // {...formik.getFieldProps('name')}
                        name="name"
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          { 'is-invalid': touched.name && errors.name },
                          {
                            'is-valid': touched.name && !errors.name,
                          }
                        )}
                      />
                      {touched.name && errors.name && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Form group */}



                    {/* begin::Form group Email */}
                    <div className='fv-row mt-5'>
                      <label className='form-label fw-bolder text-dark fs-6'>Email</label>
                      <Field
                        placeholder='email'
                        type='email'
                        // autoComplete='off'
                        name="email"
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          { 'is-invalid': touched.email && errors.email },
                          {
                            'is-valid': touched.email && !errors.email,
                          }
                        )}
                      />
                      {touched.email && errors.email && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.email}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Form group */}


                    {/* begin::Form group Celular */}
                    <div className='row fv-row mt-5'>

                      <div className='col-xl-6 mb-3'>
                        <label className='class="form-label fw-bolder text-dark fs-6'>Celular</label>
                        <Field
                          placeholder='Celular'
                          type='tel'
                          // autoComplete='off'
                          name="celular"
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                              'is-invalid': touched.celular && errors.celular,
                            },
                            {
                              'is-valid': touched.celular && !errors.celular,
                            }
                          )}
                        />
                        {touched.celular && errors.celular && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.celular}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* begin::Form group Whatsapp */}
                      <div className='col-xl-6'>
                        <label className='class="form-label fw-bolder text-dark fs-6'>Whatsapp</label>
                        <Field
                          placeholder='Whatsapp'
                          type='tel'
                          // autoComplete='off'
                          name="whats"
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                              'is-invalid': touched.whats && errors.whats,
                            },
                            {
                              'is-valid': touched.whats && !errors.whats,
                            }
                          )}
                        />
                        {touched.whats && errors.whats && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.whats}</span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                    {/* end::Form group */}


                    {/* begin::Form group CPF */}
                    <div className='fv-row mt-5'>
                      <label className='form-label fw-bolder text-dark fs-6'>CPF</label>
                      <Field
                        placeholder='CPF'
                        type=''
                        // autoComplete='off'
                        name="cpf"
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          { 'is-invalid': touched.cpf && errors.cpf },
                          {
                            'is-valid': touched.cpf && !errors.cpf,
                          }
                        )}
                      />
                      {touched.cpf && errors.cpf && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.cpf}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Form group */}


                    {/* begin::Form group RG */}

                    <div className='fv-row mt-4'>
                      <label className='form-label fw-bolder text-dark fs-6'>RG</label>
                      <Field
                        placeholder='RG'
                        type=''
                        name="rg"
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          { 'is-invalid': touched.rg && errors.rg },
                          {
                            'is-valid': touched.rg && !errors.rg,
                          }
                        )}
                      />
                      {touched.rg && errors.rg && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.rg}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Form group */}


                    {/* begin::Form group Data De nascimento */}
                    <div className='fv-row mt-4'>
                      <label className='form-label fw-bolder text-dark fs-6'>Data de nascimento</label>
                      <Field
                        placeholder='Data de nascimento'
                        type=''
                        name="nascimento"
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          { 'is-invalid': touched.nascimento && errors.nascimento },
                          {
                            'is-valid': touched.nascimento && !errors.nascimento,
                          }
                        )}
                      />
                      {touched.nascimento && errors.nascimento && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.nascimento}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Form group */}


                    {/* begin::Form group Pix */}
                    <div className='fv-row mt-4'>
                      <label className='form-label fw-bolder text-dark fs-6'>Pix</label>
                      <Field
                        placeholder='Pix'
                        type=''
                        name="pix"
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          { 'is-invalid': touched.pix && errors.pix },
                          {
                            'is-valid': touched.pix && !errors.pix,
                          }
                        )}
                      />
                      {touched.pix && errors.pix && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.pix}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Form group */}

                    {/* begin::Form group Nit / Pis */}
                    <div className='fv-row mt-4'>
                      <label className='form-label fw-bolder text-dark fs-6'>Nit / Pis</label>
                      <Field
                        placeholder='Nit / Pis'
                        type=''
                        name="nitpis"
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          { 'is-invalid': touched.nitpis && errors.nitpis },
                          {
                            'is-valid': touched.nitpis && !errors.nitpis,
                          }
                        )}
                      />
                      {touched.nitpis && errors.nitpis && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.nitpis}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Form group */}

                    {/* begin::Form group Nome da Mãe */}
                    <div className='fv-row mt-4'>
                      <label className='form-label fw-bolder text-dark fs-6'>Nome da mãe</label>
                      <Field
                        placeholder='Nome da mãe'
                        type=''
                        name="nomedamae"
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          { 'is-invalid': touched.nomedamae && errors.nomedamae },
                          {
                            'is-valid': touched.nomedamae && !errors.nomedamae,
                          }
                        )}
                      />
                      {touched.nomedamae && errors.nomedamae && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.nomedamae}</span>
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
                        <Field
                          placeholder='Banco'
                          type=''
                          name="banco"
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                              'is-invalid': touched.banco && errors.banco,
                            },
                            {
                              'is-valid': touched.banco && !errors.banco,
                            }
                          )}
                        />
                        {touched.banco && errors.banco && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.banco}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* begin::Form group Agência */}
                      <div className='col-xl-4'>
                        <label className='class="form-label fw-bolder text-dark fs-6'>Agência</label>
                        <Field
                          placeholder='Agência'
                          type=''
                          name="agencia"
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                              'is-invalid': touched.agencia && errors.agencia,
                            },
                            {
                              'is-valid': touched.agencia && !errors.agencia,
                            }
                          )}
                        />
                        {touched.agencia && errors.agencia && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.agencia}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* begin::Form group Conta */}
                      <div className='col-xl-4'>
                        <label className='class="form-label fw-bolder text-dark fs-6'>Conta</label>
                        <Field
                          placeholder='Conta'
                          type=''
                          name="conta"
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                              'is-invalid': touched.conta && errors.conta,
                            },
                            {
                              'is-valid': touched.conta && !errors.conta,
                            }
                          )}
                        />
                        {touched.conta && errors.conta && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.conta}</span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                    {/* end::Form group */}


                    {/* begin::Form group CEP e Numero*/}
                    <div className='row fv-row mt-4'>

                      {/* begin::Form group CEP */}
                      <div className='col-xl-6'>
                        <label className='class="form-label fw-bolder text-dark fs-6'>CEP</label>
                        <Field
                          placeholder='CEP'
                          type=''
                          name="cep"
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                              'is-invalid': touched.cep && errors.cep,
                            },
                            {
                              'is-valid': touched.cep && !errors.cep,
                            }
                          )}
                        />
                        {touched.cep && errors.cep && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.cep}</span>
                            </div>
                          </div>
                        )}
                      </div>


                      {/* begin::Form group Número */}
                      <div className='col-xl-6'>
                        <label className='class="form-label fw-bolder text-dark fs-6'>Número</label>
                        <Field
                          placeholder='Número'
                          type=''
                          name="numero"
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                              'is-invalid': touched.numero && errors.numero,
                            },
                            {
                              'is-valid': touched.numero && !errors.numero,
                            }
                          )}
                        />
                        {touched.numero && errors.numero && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.numero}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* end::Form group */}



                    {/* begin::Form Select */}
                    <div className="row mt-4">
                      <div className="col-md-6 fv-row fv-plugins-icon-container">
                        <label className="required fs-5 fw-bold mb-2">Função</label>
                        <input type="text" className="form-control form-control-solid mb-5" name="Função" />
                        <div className="fv-plugins-message-container invalid-feedback"></div>
                      </div>

                      <div className="col-md-6 fv-row fv-plugins-icon-container">
                        <label className="required fs-5 fw-bold mb-2">Permissão</label>
                        <select
                          // value={permisssao}
                          // onChange={(e) => setPermisssao(e.target.value)}
                          className=" form-control form-control-solid" >
                          <option disabled value="">Selecione</option>
                          <option value="5"> Colaborador </option>
                          <option value="10"> Gerente operacional </option>
                          <option value="15"> Gestor operacional </option>
                          <option value="20"> Gestor </option>
                          <option value="25"> Layouver </option>
                        </select>
                        <div className="fv-plugins-message-container invalid-feedback"></div>
                      </div>
                    </div>
                    {/* end::Form Select */}

                  </div>
                </div>


                {/* begin::  -- Buttons --  */}
                <div className="modal-footer flex-center">
                  <button
                    type="button"
                    className="btn btn-light-dark me-3"
                    onClick={() => setModalEdit(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    type='submit'
                    // id='kt_sign_up_submit'
                    className="btn btn-light-dark me-3"
                  // disabled={isSubmitting || !isValid}
                  >
                    {!loading && <span className='indicator-label'>Confirmar</span>}
                    {loading && (
                      <span className='indicator-progress ms-2 ' style={{ display: 'block' }}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>

                </div>
                {/* end::  -- Buttons --  */}

                {/* </form> */}
              </div>
            </div>
            {/* </div> */}

          </Form>
        )}

      </Formik>
    </>
  );
}

export default NewLogin