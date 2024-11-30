import React, { useState } from 'react';
import { IoLocationOutline, SlCalender, MdEdit, MdOutlineVerifiedUser, cover, userimg, SoloUserFollowContainer, AllPosts, IoArrowBack } from '../../utils/ImportsInOneFile';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { formatMemberSinceDate } from '../../utils/FormatDataFun'

export default function UserProfile(props) {
       // navigate instance
       const navigate = useNavigate();

       // destructure props
       const { _id, bio, username, fullname, profileImg, country, coverImg, following, followers, link, createdAt } = props?.user;

       // if current user
       const { data: user } = useQuery({ queryKey: ['authUser'] });
       const currentUserItIs = user.user._id === _id;

       //state
       const [selected, setSelected] = useState(1)
       const [url, setUrl] = useState('user');

       //form change
       const handelOnChange = (e) => {
              setData({ ...data, [e.target.name]: e.target.value })
       }

       //state
       const [data, setData] = useState({ username: user?.user.username, email: user?.user.email, fullname: user?.user.fullname, bio: user?.user.bio, link: user?.user.link, country: user?.user.country });

       // handelEditProfile
       const handelEditProfile = (e) => {
              e.preventDefault();
       }
       return (
              <div>
                     {/* edit profile modal */}
                     <dialog id="edit_account_modal" className="modal">
                            <div className="modal-box">
                                   <form method="dialog">
                                          {/* if there is a button in form, it will close the modal */}
                                          <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2 my-3">✕</button>
                                   </form>

                                   <div className="py-5 px-2">
                                          <h3 className="text-center font-bold text-lg my-2">Edit profile @{user?.user.username}</h3>
                                          {/* username */}
                                          <div className="my-2 w-full">
                                                 <label className="block text-sm font-semibold mb-1">Username</label>
                                                 <input
                                                        type="text"
                                                        className="input input-bordered w-full"
                                                        name="username"
                                                        value={data.username}
                                                        onChange={handelOnChange}
                                                 />
                                          </div>

                                          {/* email */}
                                          <div className="my-2 w-full">
                                                 <label className="block text-sm font-semibold mb-1">Email</label>
                                                 <input
                                                        type="text"
                                                        className="input input-bordered w-full"
                                                        name="email"
                                                        value={data.email}
                                                        onChange={handelOnChange}
                                                 />
                                          </div>

                                          {/* full name */}
                                          <div className="my-2 w-full">
                                                 <label className="block text-sm font-semibold mb-1">Full Name</label>
                                                 <input
                                                        type="text"
                                                        className="input input-bordered w-full"
                                                        name="fullname"
                                                        value={data.fullname}
                                                        onChange={handelOnChange}
                                                 />
                                          </div>

                                          {/* bio */}
                                          <div className="my-2 w-full">
                                                 <label className="block text-sm font-semibold mb-1">Bio</label>
                                                 <input
                                                        type="text"
                                                        placeholder={data.bio || "Empty"}
                                                        className="input input-bordered w-full"
                                                        name="bio"
                                                        value={data.bio}
                                                        onChange={handelOnChange}
                                                 />
                                          </div>

                                          {/* link */}
                                          <div className="my-2 w-full">
                                                 <label className="block text-sm font-semibold mb-1">Links</label>
                                                 <input
                                                        type="text"
                                                        className="input input-bordered w-full"
                                                        name="link"
                                                        placeholder={data.link || "Empty"}
                                                        value={data.link}
                                                        onChange={handelOnChange}
                                                 />
                                          </div>

                                          {/* country */}
                                          <div className="my-2 w-full">
                                                 <label className="block text-sm font-semibold mb-1">Country</label>
                                                 <input
                                                        type="text"
                                                        className="input input-bordered w-full"
                                                        name="country"
                                                        value={data.country}
                                                        onChange={handelOnChange}
                                                 />
                                          </div>

                                          {/* submit btn btn */}
                                          <button onClick={(e) => handelEditProfile(e)} className="w-full btn btn-outline rounded-full px-auto">Edit Profile</button>
                                   </div>
                            </div>
                     </dialog>

                     {/* back btn */}
                     <div className='ms-3'>
                            <div className='fixed top-4 z-50'>
                                   <IoArrowBack onClick={() => navigate(-1)} className='text-2xl cursor-pointer hover:-scale-x-130 z-50' />
                            </div>
                     </div>

                     {/* top */}
                     <div className="relative group/cover">

                            {/* Cover img */}
                            <img src={coverImg || cover} className="h-44 w-full object-cover" alt="cover image" />

                            {/* edit btn */}
                            <div className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200">
                                   <MdEdit className="w-5 h-5 text-white" />
                            </div>

                            {/* Profile img */}
                            <div className="avatar absolute -bottom-16 left-4">
                                   <div className="w-32 rounded-full relative group/avatar">
                                          {/* img */}
                                          <img src={profileImg || userimg} className="w-full h-full object-cover rounded-full" />

                                          {/* btn */}
                                          <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                                                 <MdEdit className="w-4 h-4 text-white" />
                                          </div>
                                   </div>
                            </div>

                            {/* Edit Profile */}
                            {
                                   currentUserItIs ?
                                          //currrent user then edit
                                          <div className="absolute top-52  right-2 md:right-10 p-1">
                                                 <button onClick={
                                                        (e) => {
                                                               e.preventDefault();
                                                               document.getElementById('edit_account_modal').showModal();
                                                        }
                                                 } className="btn btn-outline rounded-full px-8">Edit Profile</button>
                                          </div> :
                                          //calling solo follow
                                          <div className='absolute top-52 right-2 md:right-10'>
                                                 <SoloUserFollowContainer user={props?.user} showOnlybtn={true} />
                                          </div>
                            }
                     </div>

                     {/* below img */}
                     <div className="flex flex-col justify-start px-2  md:px-5 pt-16">
                            <div className="flex flex-col">
                                   <span className="font-extrabold text-xl">{fullname}</span>
                                   <span className="text-customGray text-sm">@{username}</span>
                            </div>

                            {/* Bio */}
                            <p className="mt-4">{bio}</p>

                            {/* Link */}
                            <a href={link} className="text-blue-500 hover:underline mt-2">{link}</a>

                            {/* Below Info */}
                            <div className="flex md:flex flex-wrap items-center gap-5 mt-2 text-gray-600">
                                   {/* Location */}
                                   <div className="flex items-center gap-1">
                                          <IoLocationOutline className="text-lg" />
                                          <span>{country === 'IN' && 'India'}</span>
                                   </div>

                                   {/* calender */}
                                   <div className="flex items-center gap-1">
                                          <SlCalender className="text-lg" />
                                          <span>{formatMemberSinceDate(createdAt)}</span>
                                   </div>

                                   {/* phone verified */}
                                   <div className="flex items-center gap-1">
                                          <MdOutlineVerifiedUser className="text-lg" />
                                          <span className='text-gray-600'>Verified phone number</span>
                                   </div>
                            </div>

                            {/* Following and Followers */}
                            <div className="flex items-center gap-5 my-4">
                                   {/* Following */}
                                   <Link to={`following`} className="flex justify-center items-center cursor-pointer hover:underline">
                                          <span>{following?.length}</span>
                                          <span className="text-customGray ms-1">Following</span>
                                   </Link>
                                   {/* Followers  */}
                                   <Link to={`followers`} className="flex justify-center items-center cursor-pointer hover:underline">
                                          <span>{followers?.length}</span>
                                          <span className="text-customGray ms-1">Followers</span>
                                   </Link>
                            </div>

                            {/* posts likes section */}
                            <div className='flex justify-between items-center px-auto w-full border-b border-slate-200 border-opacity-30'>
                                   <div className={`w-[50%] px-auto py-4 text-center  ${selected === 1 ? 'border-b-4 border-blue-500' : ''} transition-all duration-100 hover:bg-stone-700 cursor-pointer`} onClick={() => {
                                          setSelected(1)
                                          setUrl(`user`)
                                   }}>
                                          <span className='font-bold'>Posts</span>
                                   </div>
                                   <div className={`w-[50%] px-auto py-4 text-center  ${selected === 2 ? 'border-b-4 border-blue-500' : ''} transition-all duration-100 hover:bg-stone-700 cursor-pointer`} onClick={() => {
                                          setSelected(2)
                                          setUrl('user/like')
                                   }}>
                                          <span className='font-bold'>Likes</span>
                                   </div>
                            </div>
                            {/* posts */}
                            <div className='w-full'>
                                   {
                                          <AllPosts url={url} user={props?.user} />
                                   }
                            </div>
                     </div>
              </div>
       );
}
