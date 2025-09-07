import React from 'react'
import Header1 from './NavBar/Header1'
import Header2 from './NavBar/Header2'
import Header3 from './NavBar/header3'

export default function MainNave() {
  return (
    <div>
     <div className='fixed top-0 z-100 w-full bg-white'>
      <Header1/>
     <Header2/>
     </div>
    <div className='pt-30 lg:pt-20'>
       <Header3/>
    </div>
    </div>
  )
}
