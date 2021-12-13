import React from 'react'

import DropzoneComp from '../../components/DropzoneComp'
import Tr from './components/Tr';

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

          <div>
            < DropzoneComp />

            < DropzoneComp />

            < DropzoneComp />

            < DropzoneComp />

            < DropzoneComp />
          </div>

      </div>
    </>
  )
}

export default Documentos;