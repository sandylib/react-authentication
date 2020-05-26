import React from 'react'
import {Guard} from '../components/Authentication/Authentication';

export const DetailsView = () => {
  return (
    <div>
      Details page should see both

      <Guard allowed={['anonymous', 'admin']}>
       <div>this should open for anyone</div>
    </Guard>

     <Guard allowed={['admin']}>
       <div>this should pretected</div>
      </Guard>
    </div>
  )
}
