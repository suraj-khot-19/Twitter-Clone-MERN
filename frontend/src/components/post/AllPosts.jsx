import React, { useEffect } from 'react'
import SinglePostWithProp from './SinglePostWithProp'
import { useQuery } from '@tanstack/react-query'
import AllPostsSkelton from '../skeletons/AllPostsSkelton';

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
                     default:
                            return '/api/v2/post'
              }
       }

       //call a function
       const getCorrectedUrl = getUrl();

       // api call
       const { data: posts, refetch, isLoading, isRefetching } = useQuery({
              queryKey: ['posts'],
              queryFn: async () => {
                     try {
                            const res = await fetch(getCorrectedUrl) //getting url from props
                            const jsonData = await res.json();

                            if (!res.ok) {
                                   throw new Error(jsonData.error || jsonData.msg || "Something is wrong at backend")
                            }
                            return jsonData;
                     } catch (error) {
                            throw new Error(error);
                     }
              },
              retry: false,
       })

       //effect to change/refech after url change
       useEffect(() => {
              refetch(); //callling refectch from query client
       }, [url, refetch])

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
              <div>
                     {/* map through posts */}
                     {
                            posts?.posts?.map((e) => {
                                   return <SinglePostWithProp post={e} key={e._id} />
                            })
                     }
              </div>
       )
}

export default AllPosts