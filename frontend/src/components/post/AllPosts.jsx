import { AllPostsSkelton, SinglePostWithProp } from '../../utils/ImportsInOneFile'

import React, { useEffect } from 'react'
import useFetchPostWithUrl from '../../hooks/useFetchPostWithUrl';

function AllPosts(props) {
       // destructure props
       const { url } = props;

       //function to fetch the url as for props.url
       const getUrl = () => {
              switch (url) {              //loop through url
                     case 'all':
                            return '/api/v2/post'
                     case 'following':
                            return '/api/v2/post/following'
                     case 'user/like':
                            return `/api/v2/post/user/${props.user._id}`
                     case 'user':
                            return `/api/v2/post/sort/user/${props.user.username}`
                     default:
                            return '/api/v2/post'
              }
       }
       //call a function
       const getCorrectedUrl = getUrl();

       // fetch post using hook
       const { data: posts, refetch, isLoading, isRefetching } = useFetchPostWithUrl(getCorrectedUrl)

       //effect to change/refech after url change
       useEffect(() => {
              refetch(); //callling refectch from query client
       }, [url, refetch, props?.user?.username])

       if (isLoading || isRefetching) {
              return (
                     <div>
                            <AllPostsSkelton />
                            <AllPostsSkelton />
                            <AllPostsSkelton />
                            <AllPostsSkelton />
                     </div>
              )
       }

       return (
              <div className='w-full'>
                     {/* map through posts */}
                     {
                            // if no posts
                            posts?.posts?.length === 0 ?
                                   <div className='flex justify-center items-center h-full mt-3'>
                                          <span className='text-center text-xl text-slate-300 font-bold'>No Posts ...</span>
                                   </div> :
                                   // if posts
                                   posts?.posts?.map((e) => {
                                          return <SinglePostWithProp post={e} key={e._id} />
                                   })
                     }
              </div>
       )
}

export default AllPosts