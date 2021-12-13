import React from 'react'



interface IPropsTr {
  name: string
  isPending: boolean
}

const Tr = ({ name, isPending }: IPropsTr) => {
  const styleSpan = `min-w-90px fw-bold text-light p-1 rounded-1 d-flex justify-content-center`

  return (
    <tr className='border-bottom' >

      <td className='border-end w-100 d-flex align-items-center' style={{ height: '46.5px' }}>
        <p className='m-0' >
          {name}
        </p>
      </td>

      {isPending ? (
        <td style={{ height: '46.5px' }} className='w-100px' >
          <span
            className={`bg-success fw-bold text-uppercase shadow ${styleSpan}`} >
            {isPending && 'Ok'}
          </span>
        </td>
      ) : (
        <td>
          <span
            className={`bg-danger fw-bold text-uppercase shadow ${styleSpan}`}>
            {!isPending && "Pendente"}
          </span>
        </td>
      )}
    </tr>
  )
}


export default Tr
