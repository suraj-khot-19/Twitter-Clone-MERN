import React from 'react'
import LeftSideBar from '../../components/LeftSideBar'
import RightSideBar from '../../components/RightSideBar'

function Home() {
  return (
    <div className='md:flex'>

      {/* lrft sidebar */}
      <div className='w-[23%] h-screen'>
        <LeftSideBar />
      </div>

      {/* main page */}
      <div className='w-[64%] h-screen'>

      </div>

      {/* right sidebar */}
      <div className='w-[23%] h-screen'>
        <RightSideBar />
      </div>
    </div>
  )
}

export default Home