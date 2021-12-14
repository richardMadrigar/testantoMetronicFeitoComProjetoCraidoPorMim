import clsx from 'clsx'
import React, { FC, useContext } from 'react'


import { HeaderUserMenu } from '../../../partials'
import { toAbsoluteUrl } from '../../../helpers'
import { AuthContext } from '../../../../context/authContext'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'


const Topbar: FC = () => {
  const { userPerfil } = useContext(AuthContext)
  const file_name = userPerfil?.img_perfil

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>

      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          {file_name ? (
            <img src={file_name} alt="Imagem do usuário" />
          ) : (
            <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='Imagem do Usuário' />
          )}
          {/* <img src={toAbsoluteUrl('/media/avatars/150-2.jpg')} alt='Foto do usúario' /> */}
        </div>
        <HeaderUserMenu />  {/* //toggle do perfil do lado direiro  */}
      </div>



    </div>
  )
}

export { Topbar }
