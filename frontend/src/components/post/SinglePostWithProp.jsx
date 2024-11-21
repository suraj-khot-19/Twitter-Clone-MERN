import { BiRepost, FaRegComment, FaRegHeart, Link, useNavigate, MyLoading, RiDeleteBin6Line, ViewSvg, demo, userimg } from '../../utils/ImportsInOneFile';

import { formatPostDate } from '../../utils/FormatDataFun'
import { useQuery } from '@tanstack/react-query';
import useDeletePost from '../../hooks/useDeletePost';
import useLikePost from '../../hooks/useLikePost';
import { useState } from 'react';
import ShortPostDisc from './ShortPostDisc';
import useCommentToPost from '../../hooks/useCommentToPost';
import SinglePostCommentBox from './SinglePostCommentBox';


function SinglePostWithProp(props) {
       //state
       const [commentToPost, setCommentToPost] = useState('')

       // destructure post
       const { user, createdAt, title, img, comments, likes, _id } = props.post;
       const { isShowAllPostIsTrue = false, isinvalidate = false } = props

       // rand num
       const rand = () => {
              return Math.floor(10 * Math.random());
       }
       const randNum = rand();

       // if current user
       const { data: currentUser } = useQuery({ queryKey: ['authUser'] });
       const currentUserItIs = user._id === currentUser?.user?._id;

       //is liked post
       const isLikedByMe = likes.includes(currentUser?.user?._id);

       //delete post hook
       const { deletePost, isLoadingDeletePost } = useDeletePost(_id);

       //like a post hook
       const { likePost, isLoadingLikePost } = useLikePost(props.post, isinvalidate);

       //navigate
       const navigate = useNavigate();

       //! handel like
       function handelLike() {
              if (isLoadingLikePost)
                     return; //if data is loading then wait
              else
                     likePost(); //call only after data load
       }

       //! handel delete 
       function handelDelete(e) {
              e.stopPropagation()
              const confirm = window.confirm('do yo want to delete post?');
              if (confirm) {
                     if (isLoadingDeletePost)
                            return; //if data is loading then wait
                     else
                            deletePost(); //call only after data load
              }
       }

       //! handel commenting
       function openModal() {
              document.getElementById("comment" + _id).showModal()
              document.body.style.backgroundColor = 'rgba(23,23,23,0.7)'
              document.body.style.filter = '5px'
       }
       const { mutate: commentPost, isPending: isPendingComment, isSuccess } = useCommentToPost(commentToPost, _id);
       function handelCommenting() {
              isSuccess && setCommentToPost('') //make it null after comment
              if (isPendingComment)
                     return;
              else
                     commentPost();
       }

       return (
              <>
                     <div className='border-b border-slate-200 border-opacity-30 flex flex-col items-start justify-between mx-2'>
                            {/* top of post*/}
                            <div className='flex items-start md:mx-5 mt-4'>
                                   {/* img */}
                                   <div className="avatar">
                                          <div className="w-9 h-9 rounded-full">
                                                 <img src={user.profileImg || userimg} alt="Profile" />
                                          </div>
                                   </div>

                                   {/* next to img */}
                                   <div onClick={() => navigate(`/post/${_id}`)} className='ms-2 flex flex-col justify-center cursor-pointer'>
                                          {/* info */}
                                          <div className='flex items-center gap-1 md:gap-0'>
                                                 <div onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/profile/${user.username}`)
                                                 }}>
                                                        <span className='text-base font-semibold'>{user.fullname}</span>
                                                        <span className='text-base text-stone-500 ms-2 hover:underline hover:scale-110 hover:text-blue-500'>@{user.username}</span>
                                                        <span className='text-base text-stone-500 ms-2'><span className='me-1 text-white font-bold'>·</span>{formatPostDate(createdAt)}</span>
                                                 </div>

                                                 {/* delete btn aligned to the end */}
                                                 {
                                                        currentUserItIs &&
                                                        // click fun
                                                        <div className='ms-24 md:ms-96' onClick={(e)=>handelDelete(e)}>
                                                               {
                                                                      //loading 
                                                                      isLoadingDeletePost ? <MyLoading /> :
                                                                             //if not
                                                                             <RiDeleteBin6Line className='fill-white h-5 w-5 hover:scale-125 transition-all duration-150' />
                                                               }
                                                        </div>
                                                 }
                                          </div>

                                          {/* post title */}
                                          <div>
                                                 <span className='text-base font-semibold'>{title}</span>
                                          </div>
                                   </div>
                            </div>

                            {/* img to center */}
                            <div className='mx-auto w-[80%] overflow-x-hidden my-2 rounded-lg border-stone-400 border-opacity-90 cursor-pointer'>
                                   <img
                                          src={img || demo}
                                          className='h-48 md:h-80 object-cover w-full mx-auto rounded-2xl border border-gray-700'
                                          onDoubleClick={handelLike}
                                   />
                            </div>

                            {/* bottom of post */}
                            <div className='flex w-full my-3 justify-center items-center'>
                                   {/* comment modal */}
                                   <button className="btn hidden" onClick={() => document.getElementById("comment" + _id).showModal()}>open modal</button>
                                   <dialog id={`comment${_id}`} className="modal">
                                          <div className="modal-box py-2">
                                                 {/* post details short */}
                                                 <ShortPostDisc user={user} post={{ createdAt, title }} />
                                                 <form method="dialog">
                                                        {/* textarea */}
                                                        <div className='flex gap-2 mt-3'>
                                                               <div className="avatar">
                                                                      <div className="w-11 h-11 rounded-full">
                                                                             <img src={currentUser?.user?.profileImg || userimg} alt="Profile" />
                                                                      </div>                                                                                                                                     </div>
                                                               <textarea
                                                                      className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
                                                                      placeholder='Add a comment...'
                                                                      value={commentToPost}
                                                                      onChange={(e) => setCommentToPost(e.target.value)}
                                                               />
                                                        </div>
                                                        <div className='flex justify-end gap-4 pt-4'>
                                                               <button className="btn btn-outline btn-sm btn-error" onClick={()=>setCommentToPost('')}>Close</button>
                                                               <button onClick={handelCommenting} disabled={commentToPost.length === 0} type='submit' className="btn btn-outline btn-sm btn-primary">Reply</button>
                                                        </div>
                                                 </form>
                                          </div>
                                   </dialog>
                                   {/* comment */}
                                   <div className='w-[25%]'>
                                          <div className='flex justify-center items-center w-full' onClick={openModal}>
                                                 <FaRegComment className=' h-5 w-5 cursor-pointer opacity-80  hover:opacity-100' />
                                                 <span className='ms-1 text-base text-stone-500'>{comments.length}</span>
                                          </div>
                                   </div>

                                   {/* repost */}
                                   <div className='w-[25%]'>
                                          <div className='flex justify-center items-center w-full '>
                                                 <BiRepost className='h-8 w-8 cursor-pointer opacity-80 hover:opacity-100' />
                                                 <span className='ms-1 text-base text-stone-500'>{'0'}</span>
                                          </div>
                                   </div>

                                   {/* like */}
                                   <div className='w-[25%]'>
                                          {
                                                 isLoadingLikePost ?
                                                        //if loading
                                                        <MyLoading />

                                                        //if not loading
                                                        : (!isLoadingLikePost && isLikedByMe) ?
                                                               //if it is already liked then
                                                               <div className='flex justify-center items-center w-full ' onClick={handelLike}>
                                                                      <FaRegHeart className='h-5 w-5 cursor-pointer opacity-80  hover:opacity-100 text-pink-700' />
                                                                      <span className='ms-1 text-base text-pink-700'>{likes.length}</span>
                                                               </div> :

                                                               // not liked then
                                                               <div className='flex justify-center items-center w-full ' onClick={handelLike}>
                                                                      <FaRegHeart className='h-5 w-5 cursor-pointer opacity-80  hover:opacity-100' />
                                                                      <span className='ms-1 text-base text-stone-500'>{likes.length}</span>
                                                               </div>
                                          }
                                   </div>
                                   {/* view */}
                                   <div className='w-[25%]'>
                                          <div className='flex justify-center items-center w-full '>
                                                 <ViewSvg className='fill-white h-5 w-5 cursor-pointer opacity-80  hover:opacity-100' />
                                                 <span className='ms-1 text-base text-stone-500'>{randNum}</span>
                                          </div>
                                   </div>
                            </div>

                     </div>
                     {/* comments map */}
                     {
                            isShowAllPostIsTrue && (
                                   <div className='w-full'>
                                          {
                                                 comments.length === 0 ?
                                                        // if no comments
                                                        <div className='w-full mx-auto flex justify-center ms-2'>
                                                               <span className='text-center font-bold text-slate-400 text-xl'>No Comments yet 🧐!</span>
                                                        </div> :
                                                        //if comments
                                                        <div>
                                                               {
                                                                      comments?.map((e) => {
                                                                             return <div className='w-full'>
                                                                                    <SinglePostCommentBox key={e._id} comments={e} />
                                                                             </div>
                                                                      })
                                                               }
                                                        </div>
                                          }
                                   </div>
                            )
                     }
              </>
       );
}

export default SinglePostWithProp