import React from 'react'
import {LeftSideBar,RightSideBar,HomeUi} from '../../utils/ImportsInOneFile'

function Home() {

  return (
    <div className='md:flex'>

      {/* lrft sidebar */}
      <div className='hidden lg:block w-[19%] xl:w-[23%] h-screen border-r border-slate-200 border-opacity-30 overflow-hidden'>
        <LeftSideBar />
      </div>

      {/* main page */}
      <div className='w-full lg:w-[58%] h-screen overflow-y-auto'>
        <HomeUi/>
      </div>

      {/* right sidebar */}
      <div className='hidden lg:block w-[30%] xl:w-[26%] h-screen border-l border-slate-200 border-opacity-30 overflow-hidden'>
        <RightSideBar />
      </div>
      
    </div>
  )
}

export default Home