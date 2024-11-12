import React, { useEffect } from 'react'
import LeftSideBar from '../../components/sidebar/LeftSideBar'
import RightSideBar from '../../components/sidebar/RightSideBar'
import UserProfile from '../../components/profile/UserProfile'
import { useParams } from 'react-router-dom';
import ProfileSkelton from '../../components/skeletons/ProfileSkelton';
import useUserProfile from '../../hooks-Query/hooks/useUserProfile';

export default function Profile() {
       //take from params
       const { username } = useParams();

       // from custom hook
       const { data: userProfile, isLoading, isError, error,refetch,isRefetching } = useUserProfile(username);

       //efffect
       useEffect(() => {
              refetch()
       }, [username, refetch])


       return (
              <div className='md:flex'>

                     {/* lrft sidebar */}
                     <div className='hidden lg:block w-[19%] xl:w-[23%] h-screen border-r border-slate-200 border-opacity-30 overflow-hidden'>
                            <LeftSideBar />
                     </div>

                     {/* profile page */}
                     {/* error */}
                     {
                            isError &&
                            <div className='w-full lg:w-[58%] h-screen overflow-hidden'>
                                   <span className='text-center text-red-700 font-bold'>{error.message}</span>
                            </div>
                     }

                     {/* for loading */}
                     {
                            (isLoading || isRefetching) &&
                            (
                                   <div className='w-full lg:w-[58%] h-screen overflow-hidden'>
                                          <ProfileSkelton />
                                   </div>
                            )
                     }

                     {/* if all ok */}
                     {
                            (!isLoading && !isError && !isRefetching && userProfile &&
                                   <div className='w-full lg:w-[58%] h-screen overflow-y-auto'>
                                          <UserProfile user={userProfile?.user} />
                                   </div>
                            )
                     }

                     {/* right sidebar */}
                     <div className='hidden lg:block w-[30%] xl:w-[26%] h-screen border-l border-slate-200 border-opacity-30 overflow-hidden'>
                            <RightSideBar />
                     </div>

              </div>
       )
}
