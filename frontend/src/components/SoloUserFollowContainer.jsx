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
                     toast.success(`${jsonData.msg}`);
                     queryClient.invalidateQueries({ queryKey: ['authUser'] })
              },
              onError: () => {
                     toast.error(error);
              }
       })

       // follow/unfollow on btn click
       const handelFollow = () => {
              mutate();
       }

       // function to show what to display on btn
       function toDisplay() {
              return currentUser.user.following.includes(props.user._id);
       }
       const trueOrFalse = toDisplay();

       return (
              <>
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
                                          <span>{props.user.fullname}</span>
                                          <span>{props.user.username}</span>
                                   </div>
                            </div>

                            {/* follow button */}
                            <div className="flex items-center">
                                   {/* showing on btn when loading data */}
                                   {/* showing follow if only not include in following array */}
                                   {
                                          isPending ?
                                                 <div className='text-center mx-auto'>
                                                        <span className="loading loading-spinner loading-md"></span>
                                                 </div> :
                                                 trueOrFalse ?
                                                        <button className="btn btn-outline btn-sm px-3 py-1 rounded-full">UnFollow</button> :
                                                        <button onClick={handelFollow} className='btn bg-white text-black btn-sm px-5 py-1 rounded-full hover:text-white hover:border-white'>Follow</button>

                                   }
                            </div>
                     </Link>
              </>
       )
}

export default SoloUserFollowContainer