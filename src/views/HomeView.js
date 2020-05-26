import React from 'react'
import {Guard} from '../components/Authentication/Authentication';

export const HomeView = () => {
  return (
    <div>
      Home page

      <Guard allowed={['anonymous']}>
       <div>this should open for anyone</div>
      </Guard>

     <Guard allowed={['admin']}>
       <div>this should pretected only allow admin right person to see</div>
      </Guard>
    </div>
  )
}
