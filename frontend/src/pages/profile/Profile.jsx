import React from 'react'
import LeftSideBar from '../../components/sidebar/LeftSideBar'
import RightSideBar from '../../components/sidebar/RightSideBar'
import UserProfile from '../../components/profile/UserProfile'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function Profile() {
       //take from params
       const { username } = useParams();

       const { data: userProfile, isLoading, isError, error } = useQuery({
              queryKey: ['userProfile'],
              queryFn: async () => {
                     const url = `/api/v2/user/profile/${username}`
                     const res = await fetch(url);

                     const jsonData = await res.json();

                     if (!res.ok) {
                            throw new Error(jsonData.msg || jsonData.error || 'Somethong weong at backend!')
                     }
                     return jsonData;
              },
              retry: false,
       })

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
                            <div className='w-full h-full m-auto'>
                                   <span className='text-center text-red-700 font-bold'>{error}</span>
                            </div>
                     }

                     {/* for loading */}
                     {/* todo:effect */}

                     {/* if all ok */}
                     {
                            (!isLoading && !isError && userProfile &&
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
