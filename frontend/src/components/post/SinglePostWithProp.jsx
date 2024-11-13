import { BiRepost, FaRegComment, FaRegHeart, Link, MyLoading, RiDeleteBin6Line, ViewSvg, demo, userimg } from '../../utils/ImportsInOneFile';

import { formatPostDate } from '../../utils/FormatDataFun'
import { useQuery } from '@tanstack/react-query';
import useDeletePost from '../../hooks-Query/hooks/useDeletePost';
import useLikePost from '../../hooks-Query/hooks/useLikePost';


function SinglePostWithProp(props) {
       // destructure post
       const { user, createdAt, title, img, comments, likes, _id } = props.post;

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
       const { likePost, isLoadingLikePost } = useLikePost(props.post);

       //! handel like
       function handelLike() {
              if (isLoadingLikePost)
                     return; //if data is loading then wait
              else
                     likePost(); //call only after data load
       }

       //! handel delete 
       function handelDelete() {
              if (isLoadingDeletePost)
                     return; //if data is loading then wait
              else
                     deletePost(); //call only after data load
       }
       return (
              <>
                     <div className='border-b border-slate-200 border-opacity-30 flex flex-col items-start justify-between'>
                            {/* top of post*/}
                            <Link to={`/profile/${user.username}`} className='flex items-center md:mx-5 mt-4'>
                                   {/* img */}
                                   <div className="avatar">
                                          <div className="w-9 h-9 rounded-full">
                                                 <img src={user.profileImg || userimg} alt="Profile" />
                                          </div>
                                   </div>

                                   {/* next to img */}
                                   <div className='ms-2 flex flex-col justify-center'>
                                          {/* info */}
                                          <div className='flex items-center gap-1 md:gap-0'>
                                                 <span className='text-base font-semibold'>{user.fullname}</span>
                                                 <span className='text-base text-stone-500 ms-2'>@{user.username}</span>
                                                 <span className='text-base text-stone-500 ms-2'><span className='me-1 text-white font-bold'>·</span>{formatPostDate(createdAt)}</span>

                                                 {/* delete btn aligned to the end */}
                                                 {
                                                        currentUserItIs &&
                                                        // click fun
                                                        <div className='ms-24 md:ms-96' onClick={handelDelete}>
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
                            </Link>

                            {/* img to center */}
                            <div className='mx-auto w-[80%] overflow-x-hidden my-2 rounded-lg border-stone-400 border-opacity-90'>
                                   {img ? (
                                          <img
                                                 src={post.img}
                                                 className='h-80 object-contain rounded-2xl border border-gray-700'
                                                 onDoubleClick={handelLike}
                                          />
                                   ) : (
                                          <img src={demo}
                                                 onDoubleClick={handelLike} />
                                   )}
                            </div>

                            {/* bottom of post */}
                            <div className='flex w-full my-3 justify-center items-center'>
                                   {/* comment */}
                                   <div className='w-[25%]'>
                                          <div className='flex justify-center items-center w-full'>
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
              </>
       );
}

export default SinglePostWithProp