import React from 'react'

import DropzoneComp from '../components/DropzoneComp'

const Documentos = () => {

  return (
    <>
      <div className='card-header'>

        <div className="m-2 card-header">
          <h2>Documentos carregados</h2>
        </div>

        <div className="table-responsive">
          <table className="table-hover table gs-5 table-rounded border mt-5 mb-10 ">
            <tbody>
              <Tr name='RG/CNH' isPending={true} />
              <Tr name='CCM' isPending={false} />
              <Tr name='pis/NIT' isPending={true} />
              <Tr name='RG/CNH' isPending={false} />
              <Tr name='Comprovante de endereço' isPending={true} />
            </tbody>
          </table>
        </div>




            < DropzoneComp />

            < DropzoneComp />

            < DropzoneComp />

            < DropzoneComp />

            < DropzoneComp />




      </div>
    </>
  )
}

export default Documentos;




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
