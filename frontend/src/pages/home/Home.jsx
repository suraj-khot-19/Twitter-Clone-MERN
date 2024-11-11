import React from 'react'
import LeftSideBar from '../../components/LeftSideBar'
import RightSideBar from '../../components/RightSideBar'
import HomePosts from '../../components/HomePosts'

function Home() {

  return (
    <div className='md:flex'>

      {/* lrft sidebar */}
      <div className='w-[23%] h-screen border-r border-slate-200 border-opacity-30'>
        <LeftSideBar />
      </div>

      {/* main page */}
      <div className='w-[58%] h-screen'>
        <HomePosts/>
      </div>

      {/* right sidebar */}
      <div className='w-[26%] h-screen border-l border-slate-200 border-opacity-30'>
        <RightSideBar />
      </div>
    </div>
  )
}

export default Home