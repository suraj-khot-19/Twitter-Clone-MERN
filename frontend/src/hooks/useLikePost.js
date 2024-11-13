import { useMutation, useQueryClient } from "@tanstack/react-query"

const useLikePost = (post) => {
       const client = useQueryClient();

       const { mutate: likePost, isPending: isLoadingLikePost } = useMutation({
              mutationFn: async () => {
                     try {
                            const url = `/api/v2/post/like/${post?._id}`
                            const res = await fetch(url, {
                                   method: 'POST'
                            });
                            const jsonData = await res.json();
                            if (!res.ok) {
                                   throw new Error(jsonData.msg || jsonData.error || 'something wrong')
                            }
                            return jsonData;

                     } catch (error) {
                            throw new Error(error)
                     }
              },
              onSuccess: (likesArray) => {
                     //load every time
                     //! client.invalidateQueries({ queryKey: ['posts'] })

                     // ui good
                     client.setQueryData(["posts"], (oldData) => {
                            if (oldData?.posts) {
                                   return {
                                          ...oldData,
                                          posts: oldData.posts.map((p) => {
                                                 if (p._id === post._id) {
                                                        // Update only the liked post with the new likesArray
                                                        return { ...p, likes: likesArray };
                                                 }
                                                 return p; // Keep other posts as it is
                                          })
                                   };
                            }
                            return oldData;
                     });
              }
       })
       return { likePost, isLoadingLikePost }
}

export default useLikePost;