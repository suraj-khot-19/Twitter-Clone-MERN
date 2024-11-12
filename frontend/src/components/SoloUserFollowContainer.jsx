import React from 'react'
import userimg from '../assets/userimg.png'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function SoloUserFollowContainer(props) {
       // instance of query client
       const queryClient = useQueryClient();

       // get current user
       const { data: currentUser } = useQuery({ queryKey: ['authUser'] });

       // function to check follow or to unfollow
       const { mutate, isError, error, isPending } = useMutation({
              mutationKey: ['FollowingUnfollowing'],
              mutationFn: async () => {
                     const url = `/api/v2/user/follow/${props.user._id}`
                     const res = await fetch(url);
                     const jsonData = await res.json();

                     if (!res.ok) {
                            throw new Error(jsonData.error || jsonData.msg || "Somthing went wrong")
                     }
                     return jsonData;
              },
              onSuccess: (jsonData) => {
                     toast.success(`${jsonData.msg}`, { duration: 5000 });
                     queryClient.invalidateQueries({ queryKey: ['authUser'] })
              },
              onError: (jsonData) => {
                     toast.error(error || jsonData.msg || "Something went wrong!", { duration: 5000 });
              }
       })

       // follow/unfollow on btn click
       const handelFollow = (e) => {
              e.preventDefault();
              mutate();
       }

       // to show what to display on btn
       const trueOrFalse = currentUser?.user?.following.includes(props.user._id);;

       return (
              <>
                     <div>
                            <Link to={`/profile/${props.user.username}`} className="flex items-center justify-between w-full px-4 py-2 hover:bg-stone-900 transition-all rounded-full duration-300">
                                   {/* img and name */}
                                   <div className="flex items-center cursor-pointer">
                                          {/* img */}
                                          <div className="avatar">
                                                 <div className="w-11 h-11 rounded-full">
                                                        <img src={props.user.profileImg || userimg} alt="Profile" />
                                                 </div>
                                          </div>

                                          {/* name and username */}
                                          <div className="ms-4 flex flex-col items-start justify-center">
                                                 <span className="font-extrabold">{props.user.fullname}</span>
                                                 <span className="text-customGray text-sm">{props.user.username}</span>
                                                 <span>{props.isBio && props.user.bio}</span>
                                          </div>
                                   </div>

                                   {/* follow button */}
                                   {
                                          // do not show follow btn if following self
                                          !(currentUser?.user?._id === props.user._id) && <div className="flex items-center">
                                                 {/* showing on btn when loading data */}
                                                 {/* showing follow if only not include in following array */}
                                                 {
                                                        isPending ?
                                                               // loading
                                                               <div className='text-center mx-auto'>
                                                                      <span className="loading loading-spinner loading-md"></span>
                                                               </div> :
                                                               trueOrFalse ?

                                                                      // if unfollow
                                                                      <button className="transition-all duration-100 btn btn-outline btn-sm px-3 py-1 rounded-full hover:bg-red-600 border-red-500 hover:border-red-500" onClick={(e) => handelFollow(e)} >UnFollow</button> :

                                                                      // if follow
                                                                      <button onClick={(e) => handelFollow(e)} className='transition-all duration-100  btn bg-white text-black btn-sm px-5 py-1 rounded-full hover:text-white hover:border-white'>Follow</button>

                                                 }
                                          </div>
                                   }
                            </Link>
                     </div>
              </>
       )
}

export default SoloUserFollowContainer