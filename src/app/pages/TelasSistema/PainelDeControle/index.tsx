import React, { useContext } from 'react';

import Dropzone from 'react-dropzone'
import { Box } from '@mui/system';

import { GrEdit } from 'react-icons/gr';

import { AuthContext } from '../../../../context/authContext';

import UltimasNotificacoesComp from '../../components/UltimasNotificacoesComp';
import { AlertDoc } from '../../components/AlertDoc';

import { toAbsoluteUrl } from '../../../../_metronic/helpers';

import './styles.css'

import api from '../../../../setup/api';

var QRCodeUser = require('qrcode.react');

var crypto = require('crypto');
const alg = 'aes-256-ctr'


const Header = () => {

  const { userPerfil, setNewImage, newImage } = useContext(AuthContext)
  const file_name = userPerfil?.img_perfil


  //  criptografia cpf
  const teste = crypto.createCipher(alg, userPerfil?.cpf)

  const crypted = teste.update(userPerfil?.cpf, 'utf8', 'hex')
  // console.log(crypted);

  // Metodo para decifrar a criptografia
  // const descrypt = crypto.createDecipher(alg, userPerfil?.cpf)
  // const plain = descrypt.update('5fec156d359fdfd25cfe58', 'hex', 'utf8')
  // console.log(plain);



  const valueQRCode = crypted ? crypted : ""
  const myDivStyle = { width: '18rem', height: '17rem' };


  const handleEditImage = async (files: any) => {
    const data = new FormData()
    data.append('file', files[0])

    await api.put(`/editImgUser/${userPerfil?.id}`, data)
      .then(() => {
        setNewImage(!newImage)

      }).catch(error => {
        alert("Não foi possível enviar sua foto ! " + error);
      });
  }



  return (
    <>
      <AlertDoc />

      <div className="post alert-dismissible flex-column-fluid pe-0">{/*container conteudo */}

        <div className=" d-flex flex-column flex-xl-row ">

          <div className="bg-white w-100 w-xl-350px w-xxl-450px me-9"> {/*container conteudo 1 */}
            <div className="px-6 px-lg-10 px-xxl-10 py-10 ">

              <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                <div className="symbol symbol-150px me-5 pb-10">



                  <div className="container__button__edit__image">
                    <Dropzone
                      accept='image/jpeg, image/png'
                      onDrop={(files) => handleEditImage(files)} >

                      {({ getRootProps, getInputProps }) => (
                        <div className=' text-center Button__edit__image' >
                          <Box>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <GrEdit />
                            </div>
                          </Box>
                        </div>
                      )}
                    </Dropzone>
                  </div>

                  {file_name ? (
                    <img src={file_name} alt="Imagem do usuário" />
                  ) : (
                    <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='Imagem do Usuário' />
                  )}

                </div>

                <div className="d-flex flex-column">
                  <h2 className="d-flex text-dark fs-5 p-0 m-0 pb-3"> {userPerfil?.name} </h2>
                  <h3 className=" text-gray-600 fw-bold fs-6 p-0 m-0"> Gerente Operacional </h3>
                </div>
              </div>


              <div>
                <a href="https://google.com.br">
                  <p className="fw-bold text-muted text-hover-primary fs-7">Email: {userPerfil?.email}</p>
                </a>
                <a href="https://google.com.br">
                  <p className="fw-bold text-muted text-hover-primary fs-7">Celular: {userPerfil?.celular}</p>
                </a>
                <a href="https://google.com.br">
                  <p className="fw-bold text-muted text-hover-primary fs-7">Whatsapp: {userPerfil?.whats}</p>
                </a>
              </div>


              <div className="mt-16">{/*QRCode */}
                <QRCodeUser value={valueQRCode} style={myDivStyle} title={valueQRCode} />
              </div>

            </div>
          </div>{/*container conteudo 1 */}



          <div className="mb-7 "></div>

          <div className="flex-row-fluid  bg-white">{/*container conteudo 2 */}
            <div className="card-body">

              <div className="card-header ">
                <h1>Últimas notificações</h1>
              </div>


              <div className="list-group-flush m-5">
                <UltimasNotificacoesComp notificacao='O orçamento do evento Espaço Wood foi enviado por Wesley de carvalho silvetre' />
                <UltimasNotificacoesComp notificacao='O orçamento do evento Espaço Wood foi enviado por wesley' />
                <UltimasNotificacoesComp notificacao='O orçamento do evento VILA BISUTTI - CASA DO ATOR foi enviado ' />
                <UltimasNotificacoesComp notificacao='O orçamento do evento VILA BISUTTI - CASA DO ATOR foi enviado por wesley ' />
              </div>

            </div>
          </div> {/*container conteudo 2 */}

        </div>
      </div> {/*container conteudo */}

    </>
  );
}

export default Header;