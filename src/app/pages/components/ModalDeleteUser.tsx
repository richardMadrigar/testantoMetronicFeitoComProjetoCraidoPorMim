import React, { useContext } from 'react';
// import { AuthContext } from '../../../context/authContext';
import { SettingsProvider } from '../../../context/settingsContext';
import api from '../../../setup/api';


interface IProps {
  modalDelete: boolean
  idUser: string
}


const ModalDeleteUser = ({ idUser }: IProps) => {

  // const { setAtt, att, setModalDelete, modalDelete } = useContext(AuthContext)
  const { att, setAtt,  setModalDelete, modalDelete } = useContext(SettingsProvider)

  const handleDeleteUser = async (idDoUsuario: string) => {
    await api.delete(`/users/${idDoUsuario}`)
      .then((response) => { console.log(response.data) })
      .catch(error => alert(error));

    setAtt(!att)
    setModalDelete(false)
  }


  return (
    <>
      {modalDelete && <div className="drawer-overlay" />}
      <div className="modal fade show" style={{ display: modalDelete ? 'block' : 'none' }}>  {/* modal para deletar usuario */}
        <div className="modal-dialog-centered modal-dialog mw-450px ">
          <div className="modal-footer modal-content ">

            <div className="swal2-icon swal2-warning swal2-icon-show mt-10" style={{ display: 'flex' }}>
              <div className=" swal2-icon-content"> ! </div>
            </div>

            <div className="blockquote text-center mt-10 mb-5">
              <h4 >Você deseja exluir esse usuário do sistema ?</h4>
            </div>
            <div className="card-body  text-center">

              <button
                className="btn btn-primary fw-bold btn-danger m-1 "
                type="button"
                onClick={() => handleDeleteUser(idUser)}
              >
                Sim, Deletar!
              </button>

              <button
                className="btn btn-light m-1 "
                type="button"
                onClick={() => setModalDelete(false)}
              >
                Não, Cancelar
              </button>

            </div>

          </div>
        </div>
      </div>
    </>

  )
}

export default ModalDeleteUser;