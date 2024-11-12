import { useParams } from 'react-router-dom'
import LeftSideBar from '../sidebar/LeftSideBar';
import RightSideBar from '../sidebar/RightSideBar';
import useUserProfile from '../../hooks-Query/hooks/useUserProfile';
import { useNavigate } from 'react-router-dom'

function FollowerFollowingPage() {

       //params
       const { followerOrFollowing: selected, username } = useParams();

       //instance of navigate
       const navigate = useNavigate();

       //my hook
       const { data: userProfile, isLoading, isError, error, isPending } = useUserProfile(username); //from custom hook

       console.log(userProfile?.user?.followers)

       return (
              <div className='md:flex'>

                     {/* lrft sidebar */}
                     <div className='hidden lg:block w-[19%] xl:w-[23%] h-screen border-r border-slate-200 border-opacity-30 overflow-hidden'>
                            <LeftSideBar />
                     </div>

                     {/* main content */}
                     <div className='w-full lg:w-[58%] h-screen overflow-y-auto'>
                            {/* on error */}
                            {
                                   isError && <div>
                                          <span className='text-center m-auto h-full'>{error.message}</span>
                                   </div>
                            }
                            {/* on loading or pendig */}
                            {
                                   isLoading && isPending &&
                                   <div className='text-center m-auto h-full'>
                                          <span className="loading loading-spinner loading-md"></span>
                                   </div>
                            }
                            {/* top */}
                            {!isLoading && !isPending && !isError &&
                                   <div className='flex flex-col'>
                                          {/* info */}
                                          <div className='ps-12 flex flex-col items-start justify-center'>
                                                 <span className="font-extrabold text-xl">{userProfile.user.fullname}</span>
                                                 <span className="text-customGray text-sm">@{userProfile.user.username}</span>
                                          </div>

                                          {/* Followers/Following  */}
                                          <div className=' border-b border-slate-200 border-opacity-30 w-full'>
                                                 <div className='flex justify-between items-center px-auto mx-auto w-[80%]'>
                                                        {/* Followers */}
                                                        <div className={`w-[50%] px-auto pb-4 text-center ${selected === 'followers' ? 'border-b-4 border-blue-500' : ''} transition-all duration-300 hover:bg-stone-700 cursor-pointer`} onClick={() => {
                                                               navigate(`/profile/${username}/followers`)
                                                        }}>
                                                               <span className='font-bold'>Followers</span>
                                                        </div>
                                                        {/* Following */}
                                                        <div className={`w-[50%] px-auto pb-4 text-center ${selected === 'following' ? 'border-b-4 border-blue-500' : ''} transition-all duration-300 hover:bg-stone-700 cursor-pointer`} onClick={() => {
                                                               navigate(`/profile/${username}/following`)
                                                        }}>
                                                               <span className='font-bold'>Following</span>
                                                        </div>
                                                 </div>

                                          </div>
                                          {/* showing follwers or following on selected */}
                                          {
                                                 selected === 'following' ?
                                                        userProfile?.user?.following?.map((e) => {
                                                               return <div key={e}>
                                                                      {e}
                                                               </div>
                                                        })
                                                        :   userProfile?.user?.followers?.map((e) => {
                                                               return <div key={e}>
                                                                      {e}
                                                               </div>
                                                        })
                                          }
                                   </div>

                            }
                     </div>

                     {/* right sidebar */}
                     <div className='hidden lg:block w-[30%] xl:w-[26%] h-screen border-l border-slate-200 border-opacity-30 overflow-hidden'>
                            <RightSideBar />
                     </div>
              </div>
       )
}

export default FollowerFollowingPage