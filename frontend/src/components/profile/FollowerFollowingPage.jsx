import { useParams } from 'react-router-dom'
import LeftSideBar from '../sidebar/LeftSideBar';
import RightSideBar from '../sidebar/RightSideBar';
import useUserProfile from '../../hooks-Query/hooks/useUserProfile';
import { useNavigate } from 'react-router-dom'
import SoloUserFollowContainer from '../SoloUserFollowContainer';
import { IoArrowBack } from "react-icons/io5";

function FollowerFollowingPage() {
       //params
       const { followerOrFollowing: selected, username } = useParams();

       //instance of navigate
       const navigate = useNavigate();

       //my hook
       const { data: userProfile, isLoading, isError, error, isPending } = useUserProfile(username); //from custom hook

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
                                          {/* back btn */}
                                          <div className='ms-2'>
                                                 <div className='fixed top-4'>
                                                        <IoArrowBack onClick={() => navigate(-1)} className='text-2xl cursor-pointer hover:scale-x-125' />
                                                 </div>
                                          </div>

                                          {/* info */}
                                          <div className='ps-12 flex flex-col items-start justify-center'>
                                                 <span className="font-extrabold text-xl">{userProfile.user.fullname}</span>
                                                 <span className="text-customGray text-sm">@{userProfile.user.username}</span>
                                          </div>

                                          {/* Followers/Following  */}
                                          <div className='border-b border-slate-200 border-opacity-30 w-full'>
                                                 <div className='flex justify-between items-center px-auto mx-auto w-[80%]'>
                                                        {/* Following */}
                                                        <div className={`w-[50%] px-auto pb-4 text-center ${selected === 'following' ? 'border-b-4 border-blue-500' : ''} transition-all duration-300 hover:bg-stone-700 cursor-pointer`} onClick={() => {
                                                               navigate(`/profile/${username}/following`)
                                                        }}>
                                                               <span className='font-bold'>Following  {userProfile?.user?.following?.length}</span>
                                                        </div>
                                                        {/* Followers */}
                                                        <div className={`w-[50%] px-auto pb-4 text-center ${selected === 'followers' ? 'border-b-4 border-blue-500' : ''} transition-all duration-300 hover:bg-stone-700 cursor-pointer`} onClick={() => {
                                                               navigate(`/profile/${username}/followers`)
                                                        }}>
                                                               <span className='font-bold'>Followers {userProfile?.user?.followers?.length}</span>
                                                        </div>
                                                 </div>

                                          </div>
                                          {/* showing follwers or following on selected */}
                                          <div className='px-2'>
                                                 {
                                                        selected === 'following' ?
                                                               //if no following 
                                                               userProfile?.user?.following?.length === 0 ?
                                                                      <div className='mx-auto mt-5'>
                                                                             <span className='text-xl md:text-4xl font-bold'>@{userProfile?.user?.username} isn’t following anyone</span>
                                                                             <p className='ms-1 mt-2 text-stone-500'> Once they follow accounts, they’ll show up here.</p>
                                                                      </div> :

                                                                      //if following then 
                                                                      userProfile?.user?.following?.map((e) => {
                                                                             return <div key={e._id}>
                                                                                    <SoloUserFollowContainer user={e} isBio={true} />
                                                                             </div>
                                                                      })
                                                               :
                                                               //if no followers
                                                               userProfile?.user?.followers?.length === 0 ?
                                                                      <div className='mx-auto mt-5'>
                                                                             <span className='text-xl md:text-4xl font-bold'>@{userProfile?.user?.username} doesn’t have any followers yet</span>
                                                                             <p className='ms-1 mt-2 text-stone-500'> Once someone follow then they’ll show up here.</p>
                                                                      </div> :

                                                                      // if having followers
                                                                      userProfile?.user?.followers?.map((e) => {
                                                                             return <div key={e._id}>
                                                                                    <SoloUserFollowContainer user={e} isBio={true} />
                                                                             </div>
                                                                      })
                                                 }
                                          </div>
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