import clsx from 'clsx'

import { KTSVG } from '../../../helpers'
import { useLayout } from '../../core'

import { Topbar } from './Topbar'

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout()
  const { header, aside } = config

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' /> {/*icon de menu para mobile*/}
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}


        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='kt_header_nav'>
              {/* <Header /> */}
            </div>
          )}

          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar /> {/* Nome do usuario do lado direito*/}
          </div>
        </div>
        {/* end::Wrapper */}

      </div>
    </div>
  )
}
