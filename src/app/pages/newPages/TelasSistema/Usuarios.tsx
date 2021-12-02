import React, { useContext, useEffect, useState } from 'react'
import api from '../../../../setup/api';

//contexto
import { AuthContext } from '../../../../context/authContext';

//componentes
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'

import ModalDeleteUser from '../../newComponents/ModalDeleteUser';
import ModalEditUser from '../../newComponents/ModalEditUser';
import ModalAddUser from '../../newComponents/ModalAddUser'

import Pagination from '../../newComponents/Pagination'
import { AlertDoc } from '../components/AlertDoc';

//styles
import '../../../../_metronic/assets/stylesCss/style.css'


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
  const { att, setModalDelete, modalDelete, setModalEdit, modalEdit } = useContext(AuthContext)

  const [modal, setModal] = useState(false)


  const [modalNewPassword, setModalNewPassword] = useState(false) //modal with password
  const [newPassword, setNewPassword] = useState(false) // const da senha
  const [modalReset, setModalReset] = useState(false) //modal reset

  const [idUser, setIdUser] = useState('')
  const [userId, setUserId] = useState('')

  const [dataEdit, setDataEdit] = useState([{
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
  }]) //user edit

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
          // console.log(response.data);
          setUsers(response.data)
        })
        .catch(error => alert('Erro ao requisitar o servidor para pegar usuários! ' + error))
    }
    fetchData()
  }, [att, modal]);


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



  const handleMoldalEdit = async (idDoUsuario: string) => {
    console.log(idDoUsuario);

    setUserId(idDoUsuario)

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
        userId={userId}
      />

      <ModalDeleteUser
        modalDelete={modalDelete}
        idUser={idUser}
      />

      <ModalAddUser
        modal={modal}
        setModal={setModal}
      />

      <div className={`card ${className}`}>

        {/* Inicio Nova Senha */}
        {/* modal reset password user */}
        {modalReset && <div className="drawer-overlay" />}
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

        {/* modal new password  */}
        {modalNewPassword && <div className="drawer-overlay" />}

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
            <button className='btn btn-sm btn-light-dark' onClick={() => setModal(true)}>
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
                  <th className='w-25px text-center'>ID</th>
                  <th className='min-w-250px'>Nome</th>
                  <th className='min-w-120px'>RG/CNH</th>
                  <th className='min-w-100px text-center'>CCM	</th>
                  <th className='min-w-100px text-center'>PIS/NIT	</th>
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

                          <button onClick={() => handleMoldalEdit(users.id)} type="button" className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1  ' title="Editar usuário" >
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
    </>
  )
}

export default Usuarios