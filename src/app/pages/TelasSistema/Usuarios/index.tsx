import React, { useContext, useEffect, useState } from 'react'

import api from '../../../../setup/api';

//contexto
import { SettingsProvider } from '../../../../context/settingsContext';

//componentes
import { AlertDoc } from '../../components/AlertDoc';

import { KTSVG } from '../../../../_metronic/helpers'

import ModalDeleteUser from '../../components/ModalDeleteUser';
import ModalEditUser from '../../components/ModalEditUser';
import ModalAddUser from '../../components/ModalAddUser'

import Pagination from '../../components/Pagination'


import ButtonInfoEditDeletAdd from '../../components/ButtonInfoEditDeletAdd';
import { Tr, TdUserCPF, TrEmail, TrId } from './Td';

//styles
import '../../../../_metronic/assets/stylesCss/style.css'

type Props = {
  qtdUsers: number
  idUserDelete: number
  itensPerPage: number
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}


//offset pra identificar em qual pagina está
const Usuarios: React.FC<Props> = () => {
  

  const { att, setModalDelete, modalDelete, setModalEdit, modalEdit } = useContext(SettingsProvider)

  const [modal, setModal] = useState(false)

  const [modalWithNewPassword, setModalWithNewPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [modalReset, setModalReset] = useState(false)

  const [idUser, setIdUser] = useState('')

  const [dataEdit, setDataEdit] = useState({
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
  })

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


  useEffect(() => {
    const fetchData = async () => {
      await api.get('/users')
        .then((response) => {
          setUsers(response.data)
        })
        .catch(error => alert('Erro ao requisitar o servidor para pegar usuários! ' + error))
    }
    fetchData()
  }, [att, modal]);

  useEffect(() => {
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
        setNewPassword(response.data.newPassword)
        setModalWithNewPassword(true)
      })
      .catch(error => alert(error));
    setModalReset(false)
  }

  const handleMoldalEdit = async (idDoUsuario: string) => {
    setIdUser(idDoUsuario)

    await api.get(`/users/${idDoUsuario}`)
      .then((response) => {
        setDataEdit(response.data)
      })
      .catch(error => alert('Erro no servidor o dados do usuário para editar! ' + error))

    setModalEdit(true)
  }


  return (
    <>
      <AlertDoc />

      <ModalEditUser
        modalEdit={modalEdit}
        dataEdit={dataEdit}
        idUser={idUser}
      />

      <ModalDeleteUser
        modalDelete={modalDelete}
        idUser={idUser}
      />

      <ModalAddUser
        modal={modal}
        setModal={setModal}
      />

      <div className='card'>

        {modalWithNewPassword || modalReset ? <div className="drawer-overlay" /> : null}

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


        {/* modal newPassword  */}
        <div className="modal" style={{ display: modalWithNewPassword ? 'block' : 'none' }}>
          <div className="modal-dialog-centered modal-dialog mw-450px ">
            <div className="modal-footer modal-content ">

              <div className="swal2-icon swal2-warning swal2-icon-show mt-10" style={{ display: 'flex' }}>
                <div className=" swal2-icon-content"> ! </div>
              </div>

              <div className="blockquote text-center mt-10 mb-5">
                <h4 > Nova senha: {newPassword} </h4>
              </div>
              <div className="card-body  text-center">
                <button onClick={() => setModalWithNewPassword(false)} type="button" className="btn btn-light m-1 "> OK </button>
              </div>

            </div>
          </div>
        </div>


        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>

          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3'> Lista </span>
            <span className='text-muted mt-1 fw-bold fs-7'> Total de registros: {qtdUsers} </span>
          </h3>

          <div className='card-toolbar' >
            <button className='btn btn-sm btn-light-dark' onClick={() => setModal(true)} title='Adicionar novo usuário'>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Novo usuário
            </button>
          </div>

        </div>{/* end::Header */}

        <div className='card-body py-3'>

          <div className='table-responsive'>{/* Inicio-Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 table-hover'>

              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='w-25px text-center'>ID</th>
                  <th className='min-w-250px'>Nome</th>
                  <th className='min-w-120px text-center'>RG/CNH</th>
                  <th className='min-w-100px text-center'>CCM	</th>
                  <th className='min-w-100px text-center'>PIS/NIT	</th>
                  <th className='min-w-100px text-center'>Comprovante de endereço</th>
                  <th className='min-w-140px'>Email</th>
                  <th className='min-w-150px  text-center'>Celular</th>
                  <th className='min-w-100px text-center'>Whats</th>
                  <th className='min-w-120px text-center'>Permissões</th>
                  <th className='min-w-120px text-center'>CNPJ</th>
                  <th className='min-w-120px text-center'>Nascimento</th>
                  <th className='min-w-120px text-center'>Nome da mãe</th>
                  <th className='min-w-120px text-center'>Pix</th>
                  <th className='min-w-120px text-center'>Banco</th>
                  <th className='min-w-120px text-center'>Agência</th>
                  <th className='min-w-120px text-center'>Conta</th>
                  <th className='min-w-120px text-center'>CEP</th>
                  <th className='min-w-120px text-center'>Número</th>
                  <th className='text-center'></th>
                </tr>
              </thead>

              <tbody>
                {currentItens.map(users => {
                  return (

                    <tr key={users.id}>
                      <TrId users={users.id} />

                      <TdUserCPF
                        users={users.name}
                        cpf={users.cpf}
                      />

                      <Tr users={users.rg} />

                      <Tr users={users.ccm} />

                      <Tr users={users.nitpis} />

                      <Tr users={users.celular} />

                      <TrEmail users={users.email} />

                      <Tr users={users.celular} />

                      <Tr users={users.whats} />

                      <Tr users={'gerente'} />

                      <Tr users={'cnjp'} />

                      <Tr users={users.nascimento} />

                      <Tr users={users.nomedamae} />

                      <Tr users={users.pix} />

                      <Tr users={users.banco} />

                      <Tr users={users.agencia} />

                      <Tr users={users.conta} />

                      <Tr users={users.cep} />

                      <Tr users={users.numero} />

                      <td>{/* inicio - buttons Edit/ delete/ resetar */}
                        <div className='d-flex justify-content-end flex-shrink-0 ms-5'>

                          <ButtonInfoEditDeletAdd
                            icon={<KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />}
                            title="Resetar usuário"
                            onClick={() => handleMoldalResetPassword(users.id)}
                          />
                          <ButtonInfoEditDeletAdd
                            icon={<KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />}
                            title="Editar usuário"
                            onClick={() => handleMoldalEdit(users.id)}
                          />
                          <ButtonInfoEditDeletAdd
                            icon={<KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />}
                            title='Deletar usuário'
                            onClick={() => handleMoldalDelete(users.id)}
                          />

                        </div>
                      </td>{/* fim - buttons Edit/ delete/ resetar */}
                    </tr>
                  )
                })}
              </tbody>{/* fim do usuario */}

            </table>
          </div>{/* Fim-Table */}


          <div className="example-preview">{/* inicio-paginação */}
            <div className="d-flex justify-content-between align-items-center flex-wrap">

              <div className="d-flex flex-wrap py-2 mr-3">
                {users && qtdUsers ? (
                  <Pagination
                    itensPerPage={itensPerPage}
                    qtdUsers={qtdUsers}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                ) : null}
              </div>

              <div className="d-flex align-items-center py-6">
                <div className="mr-2 text-muted"> Mostrando </div>

                <select
                  value={itensPerPage}
                  onChange={(e) => setItensPerPage(Number(e.target.value))}
                  className="form-control btn btn-icon btn-sm btn-bg-light font-weight-bold mr-4 border-0 m-1" >
                  <option value="5"> 5 </option>
                  <option value="10"> 10 </option>
                  <option value="15"> 15 </option>
                  <option value="20"> 20 </option>
                  <option value="25"> 25 </option>
                </select>
                <span className="text-muted"> de {qtdUsers} registros</span>
              </div>

            </div>
          </div>{/* fim-paginação */}

        </div>
      </div>
    </>
  )
}

export default Usuarios
// 482