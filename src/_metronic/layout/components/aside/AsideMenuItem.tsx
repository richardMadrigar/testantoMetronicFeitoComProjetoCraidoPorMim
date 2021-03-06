import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

import clsx from 'clsx'

import { checkIsActive, KTSVG } from '../../../helpers'
import { useLayout } from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const AsideMenuItem: React.FC<Props> = ({ to, title, icon, fontIcon, hasBullet = false }) => {
  const { pathname } = useLocation()

  const { config } = useLayout()

  const { aside } = config

  const isActive = checkIsActive(pathname, to)
  
  return (
    <div className='menu-item'>

      <Link className={clsx('menu-link without-sub', { active: isActive })} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}

        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        {/*titulo da lista do aside esquerdo */}
        <span className='menu-title'>
          {title}
        </span>

      </Link>

    </div>
  )
}

export { AsideMenuItem }
