import { Home, Login, Signup, Profile, FollowerFollowingPage, RightSideBar, LeftSideBar, BottomNavBar } from './utils/ImportsInOneFile'

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { useQuery } from '@tanstack/react-query'

function App() {

  //query
  const { data: authUser, isLoading } = useQuery({  //data(The last successfully resolved data for the query) will be used as authUser
    queryKey: ['authUser'],
    queryFn: async () => {
      const url = '/api/v2/auth/me'
      try {
        const res = await fetch(url)

        //user
        const jsonData = await res.json();

        //if no query client then set null
        if (jsonData.error) return null;

        //if not
        if (!res.ok) throw new Error(jsonData.msg || "Not Authenticate user")

        //if all ok
        return jsonData;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false //do not retry api request if user not found
  });

  //if loading
  if (isLoading) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <span className="loading loading-spinner text-primary loading-lg "></span>
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
        {/* full page */}
        <div className='md:flex'>

          {/* Left Sidebar */}
          {authUser && (
            <div className='hidden lg:block w-[19%] xl:w-[23%] h-screen border-r border-slate-200 border-opacity-30 overflow-hidden'>
              <LeftSideBar />
            </div>
          )}

          {/* Main Content */}
          <div className='w-full lg:w-[58%] h-screen overflow-y-auto'>

            <Routes>
              {/* home */}
              <Route path="/" element={authUser ? <Home /> : <Navigate to='/login' />} />

              {/* login */}
              <Route path='/login' element={!authUser ? <Login className='max-w-screen-xl mx-auto flex h-screen px-10 md:flex-row flex-col' /> : <Navigate to='/' />} />

              {/* signup */}
              <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />

              {/* single profile */}
              <Route path="/profile/:username" element={authUser ? <Profile className='w-full lg:w-[58%] h-screen overflow-hidden' /> : <Navigate to='/login' />} />

              {/* followers following page */}
              <Route path="/profile/:username/:followerOrFollowing" element={authUser ? <FollowerFollowingPage className='w-full lg:w-[58%] h-screen overflow-y-auto' /> : <Navigate to='/login' />} />

            </Routes>
          </div>

          {/* Right Sidebar */}
          {authUser && (
            <div className='hidden lg:block w-[30%] xl:w-[26%] h-screen border-l border-slate-200 border-opacity-30 overflow-hidden'>
              <RightSideBar />
            </div>
          )}

          {/* bottom bar */}
          {
            authUser && <div className='block md:hidden'>
              <BottomNavBar />
            </div>
          }
        </div>
      </Router>
    </>
  )
}
export default App
