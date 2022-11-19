import React from 'react'
import Unauthorized from '../../components/common/unauthorized/unauthorized'
import UserTemplate from '../../templates/user-template'

const UnauthorizedPage = () => {
  return (
    <UserTemplate>
      <Unauthorized/>
    </UserTemplate>
  )
}

export default UnauthorizedPage