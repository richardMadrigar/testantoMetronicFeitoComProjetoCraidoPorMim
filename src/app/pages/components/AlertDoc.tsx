import * as React from 'react';

export const AlertDoc = () => {
  const modalDelete = true 

  return (

    <div className="alert bg-danger d-flex-flex-column flex-sm-row p-5 mb-5 " style={{ display: modalDelete ? 'block' : 'none' }} >
      <div className=" d-flex flex-column text-light pe-0 pe-sm-10 " >

        <h4 className="text-white "> Existe pendências em seus documentos! </h4>

        <span > Constatamos pendências em seus documentos. Gentileza realizar upload deles
         <a href="https://google.com.br" className="btn btn-perigo p-0 text-hover-primary ms-2"> aqui </a>.
        </span>

      </div>
    </div>
  );
};