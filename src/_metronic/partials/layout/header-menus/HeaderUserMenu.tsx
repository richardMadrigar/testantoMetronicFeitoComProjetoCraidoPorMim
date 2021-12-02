import { FC, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';


import { AuthContext } from '../../../../context/authContext';

const HeaderUserMenu: FC = () => {
  const { userPerfil, setAutorization } = useContext(AuthContext)


  const history = useHistory();

  const logout = async () => {
    localStorage.removeItem('token')

    setAutorization(false)
    history.push('/')
  }


  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>

          <div className='me-5'>
          </div>

          <div className='d-flex flex-column me-5'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {userPerfil?.name} {/*será dinamico*/}
            </div>
            <div className='fw-bold text-muted text-hover-primary fs-7'>
              {userPerfil?.email} {/*será dinamico*/}
            </div>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>



      <div className='menu-item px-5'>
        <Link to='/' className='menu-link px-5'>
          <div onClick={logout} className='menu-link px-5'>
            Sair
          </div>
        </Link>
      </div>

    </div>
  )
}

export { HeaderUserMenu }
