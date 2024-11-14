import { Home, Login, Signup, Profile, FollowerFollowingPage, RightSideBar, LeftSideBar, BottomNavBar, MyLoading, PostPage } from './utils/ImportsInOneFile'

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import useAuthUser from './hooks/useAuthUser';

function App() {
  //query from hook
  const { data: authUser, isLoading } = useAuthUser();

  //if loading
  if (isLoading) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <MyLoading />
      </div>
    )
  }

  //else and navigate with help of authUser
  return (
    <>
      {/* toaster on top */}
      <div style={{ filter: 'none', zIndex: '1000' }}>
        <Toaster />
      </div>

      <Router>
        <div className={`${!authUser ?
          //show only login or sign up with full screen
          'w-full h-full mx-auto' :
          //showing all insted of login or sign up with full screen
          'md:flex'}`}>

          {authUser && (
            <div className='hidden lg:block w-[19%] xl:w-[23%] h-screen border-r border-slate-200 border-opacity-30 overflow-hidden'>
              <LeftSideBar />
            </div>
          )}

          {/* Main Content */}
          <div className={`${!authUser ?
            //show only login or sign up with full screen
            'w-full h-full' :
            //showing all insted of login or sign up with full screen
            'w-full lg:w-[58%] h-screen overflow-y-auto'}`}>

            <Routes>
              <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
              <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />

              <Route path="/" element={authUser ? <Home /> : <Navigate to='/login' />} />
              <Route path="/profile/:username" element={authUser ? <Profile className='w-full lg:w-[58%] h-screen overflow-hidden' /> : <Navigate to='/login' />} />
              <Route path="/profile/:username/:followerOrFollowing" element={authUser ? <FollowerFollowingPage className='w-full lg:w-[58%] h-screen overflow-y-auto' /> : <Navigate to='/login' />} />

              <Route path="/post/:id" element={authUser ? <PostPage className='w-full lg:w-[58%] h-screen overflow-y-auto' /> : <Navigate to='/login' />} />
            </Routes>
          </div>

          {authUser && (
            <div className='hidden lg:block w-[30%] xl:w-[26%] h-screen border-l border-slate-200 border-opacity-30 overflow-hidden'>
              <RightSideBar />
            </div>
          )}

          {authUser && (
            <div className='block md:hidden'>
              <BottomNavBar />
            </div>)}

        </div>
      </Router>
    </>
  )
}
export default App