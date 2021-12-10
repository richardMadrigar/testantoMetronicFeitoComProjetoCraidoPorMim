import { useState } from 'react'

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { AlertDoc } from "../components/AlertDoc";


const ExtratoRecebimento = () => {
  const [value, setValue] = useState<Date | null>(null);
  const [value1, setValue1] = useState<Date | null>(null);
  console.log(value);
  console.log(value1);

  const numbers = [1, 2, 3, 4];


  return (
    <>
      <AlertDoc />


      <div className='card-header border-0 pt-5 mb-8 w-100'>

        <div className="card-header ">
          <h2>Filtros</h2>
        </div>

        <div className="d-flex justify-content-start m-10 ">

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="d-flex flex-column me-10">

              <label className='mb-5'>Vigência</label>

              <DatePicker
                label="Selecione uma data inicio"
                value={value}
                onChange={newValue => setValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="d-flex flex-column">

              <label className='mb-5'>Vigência</label>

              <DatePicker
                label="Selecione uma data final"
                value={value1}
                onChange={newValue => setValue1(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </div>
      </div>

      <div className='card-header ps-5 pe-5 '>

        <div className="card-header ">

          <div className="d-flex justify-content-between align-items-center">
            <h2>Extrato</h2>
            <button className="btn btn-bg-light btn-active-dark ">PDF</button>
          </div>

        </div>

        <div className="table-responsive ">

          <table className="table-hover table gy-5 gs-5 table-rounded border mt-15 mb-10">

            <thead>
              <tr className="fw-bolder fs-6 text-gray-800">
                <th className="min-w-100px border-end">Data</th>
                <th className="min-w-200px border-end">Evento</th>
                <th className="min-w-100px border-end">Coloborador</th>
                <th className="min-w-150px border-end">Função</th>
                <th className="min-w-50px">Valor</th>
              </tr>
            </thead>

            <tbody>

              {numbers.map(users => {
                return (
                  <tr key={users}>
                    <td className='border-end'>2011/07/25</td>
                    <td className='border-end'>Espaço Wood</td>
                    <td className='border-end'>Colaborador</td>
                    <td className='border-end'>Garçom</td>
                    <td>100,00</td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>
    </>

  )
}
export default ExtratoRecebimento;



















// import React from "react";
// import { AlertDoc } from "../components/AlertDoc";

// const ExtratoRecebimento = () => {
//   return (
//     <>
//       <AlertDoc />
//       <label>
//         <input type='file' placeholder='upload ' />
//       </label>
//     </>
//   )
// }
// export default ExtratoRecebimento;

