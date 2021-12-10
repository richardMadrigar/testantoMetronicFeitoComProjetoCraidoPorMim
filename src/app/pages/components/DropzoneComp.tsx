import React from 'react'

import api from '../../../setup/api';

import Dropzone from 'react-dropzone'
import { Box } from '@mui/system';


const handleInserImg = async (files: any) => {

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
    <div className='mb-5 wh-50 rounded border-secondary p-10 text-center ' style={{borderStyle: 'dashed'}}>

      <Dropzone onDrop={(files) => handleInserImg(files)}  >

        {({ getRootProps, getInputProps }) => (
          <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p  className='m-0'>
                Arraste e solte alguns arquivos aqui ou clique para selecioná-los
              </p>
            </div>
          </Box>
        )}
      </Dropzone>

    </div>
  )
}
export default DropzoneComp;