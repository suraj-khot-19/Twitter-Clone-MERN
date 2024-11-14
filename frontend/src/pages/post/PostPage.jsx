import React, { useEffect } from 'react'
import { AllPostsSkelton, SinglePostWithProp, useParams } from '../../utils/ImportsInOneFile'
import useFetchPostWithUrl from '../../hooks/useFetchPostWithUrl';

export default function PostPage() {
  const { id } = useParams();
  const { data: post, refetch, isLoading, isRefetching } = useFetchPostWithUrl(`/api/v2/post/${id}`);

  useEffect(() => {
    refetch();
  }, [id, refetch])

  if (isLoading || isRefetching) {
    return (
      <div>
        <AllPostsSkelton />
      </div>)
  }

  // Check if post exists before rendering
  if (!post?.post) {
    return <div>Post not found or failed to load.</div>;
  }

  return (
    <div>
      <SinglePostWithProp post={post?.post} isShowAllPostIsTrue={true} isinvalidate={true}/>
    </div>
  )
}
