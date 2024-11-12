import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'
import { Toaster } from "react-hot-toast";
import { useQuery } from '@tanstack/react-query'
import Profile from './pages/profile/Profile'
import FollowerFollowingPage from './components/profile/FollowerFollowingPage'
import BorromNavBar from './components/sidebar/BorromNavBar'

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

      {/* bottom bar */}
      <div className='block md:hidde'>
        <BorromNavBar user={authUser.user} />
      </div>

        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />
          <Route path="/profile/:username" element={authUser ? <Profile /> : <Navigate to='/login' />} />
          <Route path="/profile/:username/:followerOrFollowing" element={authUser ? <FollowerFollowingPage /> : <Navigate to='/login' />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
