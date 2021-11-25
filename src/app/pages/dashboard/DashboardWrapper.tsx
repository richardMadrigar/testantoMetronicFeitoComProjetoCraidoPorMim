/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'


const DashboardPage: FC = () => (
  <>
    begin::Row  
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
