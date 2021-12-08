import clsx from 'clsx'
import React, { FC } from 'react'

import { useLayout } from '../../core'


const Toolbar1: FC = () => {
  const { classes } = useLayout()

  // const [titleHeader, settitleHeader] = useState('Painel de controle')


  return (
    <div className='toolbar' id='kt_toolbar'>

      <div id='kt_toolbar_container' className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack ')}  >
        Painel de controle
        {/* colocar este nome dinamico conforme a tela  */}

        {/* {titleHeader} */}
      </div>
    </div>
  )
}

export { Toolbar1 }
