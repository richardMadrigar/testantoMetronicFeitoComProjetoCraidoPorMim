import React from 'react'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'

interface IPropsTr {
  users: string | null
}
interface IPropsTrUserCpf {
  users: string | null
  cpf: string | null
  file_name: string | undefined
}

const Tr = ({ users }: IPropsTr) => {
  return (
    <>
      {users ? (
        <td>
          <span
            className='text-muted fw-bold text-muted d-block fs-7 text-center '>
            {users ? users : "Pendente"}
          </span>
        </td>
      ) : (
        <td>
          <span
            className='fs-7 fw-bold text-light-danger bg-danger p-2 rounded-1 text-center d-flex justy justify-content-center '>
            {users ? users : "Pendente"}
          </span>
        </td>
      )}
    </>
  )
}
const TrId = ({ users }: IPropsTr) => {
  return (
    <>
      {users ? (
        <td>
          <span
            className="badge p-3 badge-light text-hover-primary text-center">
            {users ? users : "Pendente"}
          </span>
        </td>
      ) : (
        <td>
          <span
            className="badge p-3 badge-light text-hover-primary text-center">
            {users ? users : "Pendente"}
          </span>
        </td>
      )}

    </>
  )
}
const TrEmail = ({ users }: IPropsTr) => {
  return (
    <>
      {users ? (
        <td>
          <span
            className='text-muted fw-bold text-muted d-block fs-7'>
            {users ? users : "Pendente"}
          </span>
        </td>
      ) : (
        <td>
          <span
            className='fs-7 fw-bold text-light-danger bg-danger p-2 rounded-1  d-flex justy justify-content-center '>
            {users ? users : "Pendente"}
          </span>
        </td>
      )}

    </>
  )
}

function TdUserImageCPF({ users, cpf, file_name }: IPropsTrUserCpf) {


  return (
    <td>
      <div className='d-flex align-items-center'>
        <div className='symbol symbol-45px me-5'>

          {file_name ? (
            <img src={file_name} alt="Imagem do usuário" />
          ) : (
            <img src={toAbsoluteUrl('/media/avatars/150-3.jpg')} alt='Imagem do Usuário' />
          )}
        </div>

        <div className='text-dark fw-bolder text-hover-primary fs-6'>
          {users}
          <span className='text-muted fw-bold text-muted d-block fs-7'>
            CPF: {cpf}
          </span>
        </div>
      </div>
    </td>
  )
}

export { TdUserImageCPF, Tr, TrEmail, TrId };