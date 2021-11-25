import React, { useContext } from 'react';

import { AuthContext } from '../../../../context/authContext';

var QRCode = require('qrcode.react');



const Header = () => {
  const { userPerfil } = useContext(AuthContext)
  // console.log(userPerfil);

  const valueQRCode = userPerfil?.cpf
  const myDivStyle = { width: '17rem', height: '16rem' };

  return (
    <>

      <div className="card mb-10  alert-primary  ">  {/*container alert */}
        <div className="card-body ">
          <p className="d-flex align-items-center text-dark fw-bolder my-1 fs-3">
            Existe pendências em seus documentos!
          </p>

          <p className="list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0">
            Constatamos pendências em seus documentos. Gentileza realizar upload deles
            <a href="https://google.com.br"> aqui</a>
          </p>

        </div>
      </div>


      <div className="post  flex-column-fluid" > {/*container conteudo */}
        <div className=" d-flex flex-column flex-xl-row">

          <div className="bg-white  w-100 w-xl-350px w-xxl-450px me-9 "> {/*container conteudo 1 */}
            <div className="px-6 px-lg-10 px-xxl-10 py-10 ">

              <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                <div className="symbol symbol-150px me-5 pb-10">
                  <img src="https://github.com/richardMadrigar.png" alt="Imagem do usuário" />
                </div>


                <div className="d-flex flex-column">
                  <h2 className="d-flex text-dark fs-5 p-0 m-0 pb-3 "> {userPerfil?.name} </h2>
                  <h3 className=" text-gray-600 fw-bold fs-6 p-0 m-0"> Gerente Operacional</h3>
                </div>
              </div>


              <div className="">
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

              {/*QRCode */}
              <div className="mt-16"  >
                <QRCode value={valueQRCode} style={myDivStyle} title={valueQRCode} />
              </div>
              {/*QRCode conteudo */}

            </div>
          </div>   {/*container conteudo 1 */}

          <div className="mb-7 bg-red"></div>



          <div className="flex-row-fluid  bg-white"> {/*container conteudo 2 */}
            <div className="card-body">

              <div className="card-header ">
                <h1>Últimas notificações</h1>
              </div>


              <div className="list-group-flush m-5">

                <div className="list-group-item p-7  ">
                  <a href="https://google.com.br" className="text-dark">O orçamento do evento Espaço Wood foi enviado por Wesley de carvalho silvetre</a>
                </div>
                <div className="list-group-item p-7" >
                  <a href="https://google.com.br" className="text-dark">O orçamento do evento Espaço Wood foi enviado por wesley de carvalho silvestre</a>
                </div>
                <div className="list-group-item p-7">
                  <a href="https://google.com.br" className="text-dark">O orçamento do evento VILA BISUTTI - CASA DO ATOR foi enviado por wesley de carvalho silvestre</a>
                </div>
                <div className="list-group-item p-7">
                  <a href="https://google.com.br" className="text-dark" >O orçamento do evento Espaço Wood foi enviado por Wesley de carvalho silvetre</a>
                </div>

              </div>

            </div>
          </div> {/*container conteudo 2 */}

        </div>   {/*container conteudo */}
      </div> {/*container conteudo */}


    </>
  );
}

export default Header;