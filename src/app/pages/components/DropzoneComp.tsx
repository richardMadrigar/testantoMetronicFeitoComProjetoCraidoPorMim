import React from 'react'

import Dropzone from 'react-dropzone'
import api from '../../../setup/api';

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

    <Dropzone
      onDrop={(files) => handleInserImg(files)}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Arraste e solte alguns arquivos aqui ou clique para selecioná-los</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
}
export default DropzoneComp;