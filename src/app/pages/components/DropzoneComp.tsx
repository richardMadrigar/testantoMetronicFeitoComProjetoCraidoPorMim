import React from 'react'

import api from '../../../setup/api';

import Dropzone from 'react-dropzone'
import { Box } from '@mui/system';
import clsx from 'clsx';


const handleInserImg = async (files: any) => {

  // if (files.length > 0) {
  //   getBase64(files[0]);
  // }

  // function getBase64(file: any) {
  //   let reader = new FileReader();

  //   reader.readAsDataURL(file);

  //   reader.onload = () =>  {
  //     console.log(reader.result);
  //   };
  //   reader.onerror =  (error) => {
  //     console.log('Error: ', error);
  //   };
  // }
  // getBase64(files)

  const data = new FormData()

  console.log(files[0]);

  data.append('file', files[0])
  console.log(data);

  await api.post('/insertimg', data)
    .then(() => {
      console.log("foto enviado com sucesso");


    }).catch(error => {
      console.log("A sua foto não foi possivel fazer o envio ! " + error);
    });
}
const DropzoneComp = () => {

  return (
    <div className="mx-auto ">


      <Dropzone
        accept="image/*"
        onDrop={(files) => handleInserImg(files)}
      >

        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (

          <div
            style={{ border: 'dashed' }}
            className={clsx(`mb-5 wh-50  rounded border-secondary p-10 text-center `,
              { 'border border-2 dashed border-danger': isDragReject },
              { 'border  border-2 border-success ': !isDragReject && isDragActive }
            )}
          >

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div
                  className={clsx('m-0',
                    { 'text-danger': isDragReject },
                    { 'text-success': !isDragReject && isDragActive }
                  )}
                >
                  <div className='m-0'> Arraste e solte alguns arquivos aqui ou clique para selecioná-los </div>

                  {!isDragReject && isDragActive && <div className='m-0'>Solte a foto !</div>}
                  {isDragReject && <div className='m-0'>Arquivo inválido</div>}

                </div>
              </div>
            </Box>

          </div>

        )}
      </Dropzone>
    </div>

  )
}
export default DropzoneComp;