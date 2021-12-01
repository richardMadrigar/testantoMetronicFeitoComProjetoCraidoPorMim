import React, { useContext, useEffect, useState } from 'react'
import api from '../../../../setup/api';

import { AuthContext } from '../../../../context/authContext';

//componentes
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'

import ModalDeleteUser from '../../newComponents/ModalDeleteUser';
import ModalAddUser from '../../newComponents/ModalAddUser'

import Pagination from '../../newComponents/Pagination'
import { AlertDoc } from '../components/AlertDoc';

//styles
import '../../../../_metronic/assets/stylesCss/style.css'
import { Field, Form, Formik, useFormik } from 'formik'
import clsx from 'clsx';



type Props = {
  className: string
  qtdUsers: number
  idUserDelete: number
  itensPerPage: number
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  dataEdit: EditUser
}
type EditUser = {
  celular: '',
  cpf: '',
  email: '',
  name: '',
  rg: '',
  senha: '',
  whats: '',
  agencia: '',
  banco: '',
  conta: '',
  cep: '',
  numero: '',
  nascimento: '',
  nitpis: '',
  nomedamae: '',
  pix: '',
}



//offset pra identificar em qual pagina esta
const Usuarios: React.FC<Props> = ({ className }) => {
  const { att, setModalDelete, modalDelete } = useContext(AuthContext)

  const [modal, setModal] = useState(false)

  const [modalNewPassword, setModalNewPassword] = useState(false) //modal with password
  const [newPassword, setNewPassword] = useState(false) // const da senha
  const [modalReset, setModalReset] = useState(false) //modal reset


  const [modalEdit, setModalEdit] = useState(false) //modal edit
  const [loading, setLoading] = useState(false)



  const [idUserEdit, setIdUserEdit] = useState('')
  const [idUser, setIdUser] = useState('')


  const [users, setUsers] = useState([{
    id: '',
    celular: '',
    email: '',
    name: '',
    rg: '',
    senha: '',
    whats: '',
    cpf: '',
    agencia: '',
    banco: '',
    conta: '',
    cep: '',
    checkdoc: '',
    confsenha: '',
    nascimento: '',
    nitpis: '',
    nomedamae: '',
    numero: '',
    pix: '',
    ccm: '',
  }])


  const [currentPage, setCurrentPage] = useState(0)
  const [itensPerPage, setItensPerPage] = useState(5)

  const qtdUsers = users ? users.length : 0

  const endIndex = currentPage + itensPerPage
  const currentItens = users.slice(currentPage, endIndex)


  useEffect(() => { //renderizando todos os usuarios
    const fetchData = async () => {
      await api.get('/users')
        .then((response) => {
          setUsers(response.data)
        })
        .catch(error => alert('Erro ao requisitar o servidor para pegar usuários! ' + error))
    }
    fetchData()
  }, [att, modal, modalEdit]);


  useEffect(() => { //se mudar a qtd de pgn => volta para zero
    setCurrentPage(0)
  }, [itensPerPage])


  const handleMoldalDelete = (idDoUsuario: string) => {
    setModalDelete(true)
    setIdUser(idDoUsuario)
  }

  const handleMoldalResetPassword = (idDoUsuario: string) => {
    setModalReset(true)
    setIdUser(idDoUsuario)
  }

  const handleResetPassword = async (idDoUsuario: string) => {
    await api.put(`/resetPassword/${idDoUsuario}`)
      .then((response) => {
        // console.log(response.data.name);
        setNewPassword(response.data.newPassword)
        setModalNewPassword(true)
      })
      .catch(error => alert(error));
    setModalReset(false)
  }



  
  const searchUser = async (setFieldValue: any, idUser: any) => {
    setIdUserEdit(idUser)

    await api.get(`/users/${idUser}`)
      .then((response) => {
        setFieldValue('name', response.data.name);
        setFieldValue('email', response.data.email);
        setFieldValue('celular', response.data.celular);
        setFieldValue('whats', response.data.whats);
        setFieldValue('cpf', response.data.cpf);
        setFieldValue('rg', response.data.rg);
        setFieldValue('pix', response.data.pix);
        setFieldValue('nascimento', response.data.nascimento);
        setFieldValue('nitpis', response.data.nitpis);
        setFieldValue('nomedamae', response.data.nomedamae);
        setFieldValue('banco', response.data.banco);
        setFieldValue('agencia', response.data.agencia);
        setFieldValue('conta', response.data.conta);
        setFieldValue('cep', response.data.cep);
        setFieldValue('numero', response.data.numero);
      })
    setModalEdit(true)
  }

  const handleMoldalEdit = async (data: {}) => {
    console.log(data);

    await api.put(`/users/${idUserEdit}`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => alert('Erro ao requisitar o servidor para pegar usuários! ' + error))

    setModalEdit(false)
  }




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
    check: true,
  }
  

  const formik = useFormik({
    initialValues,

    onSubmit: (values) => {
      setLoading(true)
      console.log(values);

      handleMoldalEdit(values)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    },
  })




  return (
    <>
      {modalNewPassword || modalReset || modalEdit ? <div className="drawer-overlay" /> : <div className="" />}

      <AlertDoc />

      {/* <ModalEditUser
        modalEdit={modalEdit}
        setModalEdit={setModalEdit}
        dataEdit={dataEdit}
        idUser={idUser}
      /> */}
  
      <ModalDeleteUser
        modalDelete={modalDelete}
        idUser={idUser}
      />

      <ModalAddUser
        modal={modal}
        setModal={setModal}
      />

      {/* Inicio Nova Senha */}
      {/* modal reset password user */}
      <div className="modal" style={{ display: modalReset ? 'block' : 'none' }}>
        <div className="modal-dialog-centered modal-dialog mw-450px ">
          <div className="modal-footer modal-content ">

            <div className="swal2-icon swal2-warning swal2-icon-show mt-10" style={{ display: 'flex' }}>
              <div className=" swal2-icon-content"> ! </div>
            </div>

            <div className="blockquote text-center mt-10 mb-5">
              <h4 > Você deseja resetar a senha do usuário ? </h4>
            </div>
            <div className="card-body  text-center">
              <button onClick={() => handleResetPassword(idUser)} type="button" className="btn btn-primary fw-bold btn-danger m-1 "> Sim, Resetar! </button>
              <button onClick={() => setModalReset(false)} type="button" className="btn btn-light m-1 ">Não, Cancelar </button>
            </div>

          </div>
        </div>
      </div>

      <div className="modal" style={{ display: modalNewPassword ? 'block' : 'none' }}>
        <div className="modal-dialog-centered modal-dialog mw-450px ">
          <div className="modal-footer modal-content ">

            <div className="swal2-icon swal2-warning swal2-icon-show mt-10" style={{ display: 'flex' }}>
              <div className=" swal2-icon-content"> ! </div>
            </div>

            <div className="blockquote text-center mt-10 mb-5">
              <h4 > Nova senha: {newPassword} </h4>
            </div>
            <div className="card-body  text-center">
              <button onClick={() => setModalNewPassword(false)} type="button" className="btn btn-light m-1 "> OK </button>
            </div>

          </div>
        </div>
      </div>
      {/* Fim Nova Senha */}




      <Formik

        onSubmit={handleMoldalEdit}

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
        }}

        render={({ setFieldValue }) => (

          <Form className="form fv-plugins-bootstrap5 fv-plugins-framework">

            {modalEdit && <div className="drawer-overlay" />}
            {/* Inicio Modal editar */}
            <div className="modal fade show" style={{ display: modalEdit ? 'block' : 'none' }}  >
              <div className="modal-dialog modal-dialog-centered mw-850px">
                <div className="modal-content">


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
                          name="name"
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
                        <Field
                          placeholder='email'
                          type=''
                          // autoComplete='off'
                          name="email"
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
                          <Field
                            placeholder='Whatsapp'
                            type='tel'
                            // autoComplete='off'
                            name="whats"
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
                        <Field
                          placeholder='CPF'
                          type=''
                          // autoComplete='off'
                          name="cpf"
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
                        <Field
                          placeholder='RG'
                          type=''
                          name="rg"
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
                        <Field
                          placeholder='Data de nascimento'
                          type=''
                          name="nascimento"
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
                        <Field
                          placeholder='Pix'
                          type=''
                          name="pix"
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
                        <Field
                          placeholder='Nit / Pis'
                          type=''
                          name="nitpis"
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
                        <Field
                          placeholder='Nome da mãe'
                          type=''
                          name="nomedamae"
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
                          <Field
                            placeholder='Banco'
                            type=''
                            name="banco"
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
                          <Field
                            placeholder='Agência'
                            type=''
                            name="agencia"
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
                          <Field
                            placeholder='Conta'
                            type=''
                            name="conta"
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
                          <Field
                            placeholder='Número'
                            type=''
                            name="numero"
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
                      disabled={!formik.isValid}
                    >
                      {!loading && <span className='indicator-label'>Confirmar</span>}
                      {loading && (
                        <span className='indicator-progress' style={{ display: 'block' }}>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>

                  </div>
                  {/* end::  -- Buttons --  */}

                </div>
              </div>
              {/* </div> */}

            </div>
            {/* fim Modal editar */}


            {/* inicio da lista de usuarios */}
            <div className={`card ${className}`}>
              {/* begin::Header */}
              <div className='card-header border-0 pt-5'>

                <h3 className='card-title align-items-start flex-column'>
                  <span className='card-label fw-bolder fs-3  '>Lista</span>
                  <span className='text-muted mt-1 fw-bold fs-7'>Total de registros: {qtdUsers}</span>
                </h3>

                <div
                  className='card-toolbar' data-bs-toggle='tooltip'
                  data-bs-placement='top' data-bs-trigger='hover'
                  title='Click to add a user'
                >
                  <button className='btn btn-sm btn-light-dark' type="button" onClick={() => setModal(true)}>
                    <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                    Novo usuário
                  </button>

                </div>

              </div>
              {/* end::Header */}


              {/* begin::Body */}
              <div className='card-body py-3'>
                {/* begin::Table */}
                <div className='table-responsive'>
                  <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 table-hover'>

                    {/* begin::Table head */}
                    <thead>
                      <tr className='fw-bolder text-muted'>
                        <th className='w-25px'>ID</th>
                        <th className='min-w-250px'>Nome</th>
                        <th className='min-w-120px'>RG/CNH</th>
                        <th className='min-w-100px text-center'>CCM	</th>
                        <th className='min-w-100px'>PIS/NIT	</th>
                        <th className='min-w-100px'>Comprovante de endereço</th>
                        <th className='min-w-140px'>Email</th>
                        <th className='min-w-100px'>Celular</th>
                        <th className='min-w-100px'>Whats</th>
                        <th className='min-w-120px'>Permissões</th>
                        <th className='min-w-120px'>CNPJ</th>
                        <th className='min-w-120px'>Nascimento</th>
                        <th className='min-w-120px'>Nome da mãe</th>
                        <th className='min-w-120px'>Pix</th>
                        <th className='min-w-120px'>Banco</th>
                        <th className='min-w-120px'>Agência</th>
                        <th className='min-w-120px'>Conta</th>
                        <th className='min-w-120px'>CEP</th>
                        <th className='min-w-120px'>Número</th>
                      </tr>
                    </thead>
                    {/* end::Table head */}

                    {/* begin::Table body */}
                    <tbody>
                      {/* inicio do usuario */}
                      {currentItens.map(users => {
                        return (
                          <tr key={users.id}>
                            <td>
                              <span className="badge p-3 badge-light text-hover-primary">  {users.id}</span>
                            </td>

                            <td> {/* user */}
                              <div className='d-flex align-items-center'>

                                <div className='symbol symbol-45px me-5'>
                                  <img src={toAbsoluteUrl('/media/avatars/150-3.jpg')} alt='' />
                                </div>

                                <div className='text-dark fw-bolder text-hover-primary fs-6'>
                                  {users.name}
                                  <span className='text-muted fw-bold text-muted d-block fs-7'>
                                    CPF: {users.cpf}
                                  </span>
                                </div>

                              </div>
                            </td>
                            <td> {/* RG/CNH */}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.rg}
                              </span>
                            </td>

                            {users.ccm ? (
                              <td> {/* CCM */}
                                <span className='text-muted fw-bold text-muted d-block fs-7 text-center '>
                                  {users.ccm ? users.ccm : "Pendente"}
                                </span>
                              </td>
                            ) : (
                              <td>
                                <span className='fs-7 fw-bold text-light-danger bg-danger p-2 rounded-1 text-center d-flex justy justify-content-center '>
                                  {users.ccm ? users.ccm : "Pendente"}
                                </span>
                              </td>
                            )}


                            {users.nitpis ? (
                              <td> {/* nit/pis */}
                                <span className='text-muted fw-bold text-muted d-block fs-7 text-center '>
                                  {users.nitpis ? users.nitpis : "Pendente"}
                                </span>
                              </td>
                            ) : (
                              <td>
                                <span className='fs-7 fw-bold text-light-danger bg-danger p-2 rounded-1 text-center d-flex justy justify-content-center '>
                                  {users.nitpis ? users.nitpis : "Pendente"}
                                </span>
                              </td>
                            )}
                            {/* 
                            <td>  
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.nitpis}
                              </span>
                            </td> */}
                            <td>  {/* Comprovante de endereço */}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.celular}
                              </span>
                            </td>
                            <td>  {/* email */}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.email}
                              </span>
                            </td>
                            <td>  {/* celular*/}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.celular}
                              </span>
                            </td>
                            <td>  {/* whats */}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.whats}
                              </span>
                            </td>
                            <td>   {/* Permissoes */}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {/* {users.email} */}
                                gerente
                              </span>
                            </td>
                            <td> {/* cnpj */}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {/* {users.nascimento} */}
                                cnjp
                              </span>
                            </td>
                            <td> {/* nascimento */}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.nascimento}
                              </span>
                            </td>
                            <td> {/* Nome da mãe*/}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.nomedamae}
                              </span>
                            </td>
                            <td> {/* Pix*/}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.pix}
                              </span>
                            </td>
                            <td> {/* banco*/}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.banco}
                              </span>
                            </td>
                            <td> {/* agencia*/}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.agencia}
                              </span>
                            </td>
                            <td> {/* Conta*/}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.conta}
                              </span>
                            </td>

                            <td> {/* cep*/}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.cep}
                              </span>
                            </td>
                            <td> {/* numero*/}
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {users.numero}
                              </span>
                            </td>


                            <td>  {/* inicio - buttons Edit/ delete/ resetar */}
                              <div className='d-flex justify-content-end flex-shrink-0'>
                                <button onClick={() => handleMoldalResetPassword(users.id)} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1' title='Resetar usuário' >
                                  <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                                </button>

                                <button onClick={() => searchUser(setFieldValue, users.id)} type="button" className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1  ' title="Editar usuário" >
                                  <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                                </button>

                                <button onClick={() => handleMoldalDelete(users.id)} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm ' title='Deletar usuário'>
                                  <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                                </button>

                              </div>
                            </td> {/* fim - buttons Edit/ delete/ resetar */}

                          </tr>
                        )
                      })}

                      {/* fim do usuario */}
                    </tbody>
                    {/* end::Table body */}
                  </table>
                </div>
                {/* end::Table */}


                {/* inicio - paginação */}
                <div className="example-preview">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">

                    <div className="d-flex flex-wrap py-2 mr-3">
                      {users && qtdUsers && ( //verificar se existe
                        <Pagination
                          itensPerPage={itensPerPage}
                          qtdUsers={qtdUsers}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                        />
                      )}
                    </div>

                    <div className="d-flex align-items-center py-6">
                      <div className="mr-2 text-muted">Mostrando </div>

                      <select
                        value={itensPerPage}
                        onChange={(e) => setItensPerPage(Number(e.target.value))}
                        className=" form-control btn btn-icon btn-sm btn-bg-light font-weight-bold mr-4 border-0 m-1" >
                        <option value="5"> 5 </option>
                        <option value="10"> 10 </option>
                        <option value="15"> 15 </option>
                        <option value="20"> 20 </option>
                        <option value="25"> 25 </option>
                      </select>
                      <span className="text-muted"> de {qtdUsers} registros</span>
                    </div>

                  </div>
                </div>
                {/* fim - paginação */}
                {/* begin::Body */}

              </div>
            </div>
            {/* fim da lista de usuarios */}

          </Form>
        )
        }
      />
    </>
  )
}

export default Usuarios