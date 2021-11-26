import React, { useEffect, useState } from 'react'
import ModalAddUser from '../../newComponents/ModalAddUser'
import api from '../../../../setup/api';

//styles
import '../../../../_metronic/assets/stylesCss/style.css'

//componentes
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import Pagination from '../../newComponents/Pagination'

type Props = {
  className: string
  qtdUsers: number
  idUserDelete: number
  itensPerPage: number
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}


//limit é qtd de maximo para mostrar a pagina
//total é totoal de itens 
//offset é pra pular os itens da pagina 1
//offset pra identificar em qual pagina esta

const Usuarios: React.FC<Props> = ({ className }) => {
  const [modal, setModal] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [idUserDelete, setIdUserDelete] = useState('')


  const [users, setUsers] = useState([{
    id: '',
    celular: '',
    email: '',
    name: '',
    rg: '',
    senha: '',
    whats: '',
    cpf: '',
  }])


  const [currentPage, setCurrentPage] = useState(0) //pagina padrão 
  const [itensPerPage, setItensPerPage] = useState(5) //itens por pagina
  const [att, setAtt] = useState(false) //itens por pagina

  const qtdUsers = users ? users.length : 0 //qtd de usuarios

  const endIndex = currentPage + itensPerPage // 0 + 5
  const currentItens = users.slice(currentPage, endIndex)


  useEffect(() => {
    const fetchData = async () => {
      await api.get('/users')
        .then((response) => {
          // console.log("usuarios da api", response.data);
          setUsers(response.data)
        })
        .catch(error => alert('Erro ao requisitar o servidor para pegar usuários! ' + error))
    }
    fetchData()
  }, [att, modal]);


  useEffect(() => { //se mudar a qtd de pgn => volta para zero
    setCurrentPage(0)
  }, [itensPerPage])



  const handleDelete = async (idDoUsuario: string) => {
    await api.delete(`/users/${idDoUsuario}`)
      .then((response) => { console.log(response.data) })
      .catch(error => alert(error));

    setAtt(!att)
    setModalDelete(false)
  }

  const handleMoldalDelete = (idDoUsuario: string) => {
    // console.log(idDoUsuario);
    setModalDelete(true)
    setIdUserDelete(idDoUsuario)
  }


  return (
    <div className={`card ${className}`}>

      <ModalAddUser
        modal={modal}
        setModal={setModal}
      />

      {modalDelete && <div className="drawer-overlay" />}

      <div className="modal" style={{ display: modalDelete ? 'block' : 'none' }} >
        <div className="modal-dialog-centered modal-dialog mw-450px ">
          <div className="modal-footer modal-content ">

            <div className="swal2-icon swal2-warning swal2-icon-show mt-10" style={{ display: 'flex' }}>
              <div className=" swal2-icon-content"> ! </div>
            </div>

            <div className="blockquote text-center mt-10 mb-5">
              <h4 >Você deseja exluir esse usuário do sistema ?</h4>
            </div>
            <div className="card-body  text-center">
              <button onClick={() => handleDelete(idUserDelete)} type="button" className="btn btn-primary fw-bold btn-danger m-1 "> Sim, Deletar! </button>
              <button onClick={() => setModalDelete(false)} type="button" className="btn btn-light m-1 ">Não, Cancelar </button>
            </div>

          </div>
        </div>
      </div>


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
          <button className='btn btn-sm btn-light-primary' onClick={() => setModal(true)}>
            <span className="svg-icon svg-icon-3">
              {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg" className="mh-50px"><rect opacity="0.5"
                  x="11.364" y="20.364" width="16" height="2" rx="1"
                  transform="rotate(-90 11.364 20.364)" fill="black"></rect><rect x="4.36396"
                    y="11.364" width="16" height="2" rx="1" fill="black">
                </rect> </svg> */}
            </span>
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
                <th className='w-25px'></th>
                <th className='min-w-250px'>Nome</th>
                <th className='min-w-140px'>Email</th>
                <th className='min-w-100px'>Telefone</th>
                <th className='min-w-120px'>Permissões</th>
                <th className='min-w-120px'>RG/CNH</th>
                <th className='min-w-120px'>CNPJ</th>
                <th className='min-w-100px '>CCM	</th>
                <th className='min-w-100px '>pis/NIT	</th>
                <th className='min-w-100px '>Comprovante de endereço	</th>
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
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input className='form-check-input widget-9-check' type='checkbox' />
                      </div>
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
                    <td>  {/* email */}
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {users.email}
                      </span>
                    </td>
                    <td>  {/* telefone */}
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {users.celular}
                      </span>
                    </td>
                    <td>   {/* Permissoes */}
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {users.email}
                      </span>
                    </td>
                    <td> {/* RG/CNH */}
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {users.rg}
                      </span>
                    </td>
                    <td> {/* CNPJ */}
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {users.rg}
                      </span>
                    </td>
                    <td> {/* CCM */}
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {users.rg}
                      </span>
                    </td>
                    <td>  {/* pis/NIT */}
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {users.email}
                      </span>
                    </td>
                    <td>  {/* Comprovante de endereço */}
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {users.email}
                      </span>
                    </td>

                    <td>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1' title='Resetar usuário' >
                          <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                        </button>
                        <button type="button" className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1  ' data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" >
                          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                        </button>
                        <button onClick={() => handleMoldalDelete(users.id)} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm ' title='Deletar usuário'>
                          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                        </button>
                      </div>
                    </td>

                  </tr>
                )
              })}


              {/* fim do usuario */}
            </tbody>
            {/* end::Table body */}
          </table>
        </div>
        {/* end::Table */}



        {/* paginação */}
        <div className="example-preview">
          <div className="d-flex justify-content-between align-items-center flex-wrap">

            <div className="d-flex flex-wrap py-2 mr-3">
              {users && qtdUsers && ( //verificar se existe
                <Pagination
                  itensPerPage={itensPerPage}
                  // maxPage={pages}
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
        {/* paginação */}
        {/* begin::Body */}

      </div>
    </div>
  )
}

export default Usuarios