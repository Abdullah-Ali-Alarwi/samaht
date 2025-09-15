import React from 'react'
import Header1 from './NavBar/Header1'
import Header2 from './NavBar/Header2'
import Header3 from './NavBar/header3'

export default function MainNave() {
  return (
    <div className='fixed top-0 z-100 w-full bg-white'>
     <div>
      <Header1/>
     <Header2/>
     </div>
    <div className='bg-white'>
       <Header3/>
    </div>
    </div>
  )
}
