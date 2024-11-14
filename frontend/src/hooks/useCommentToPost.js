import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCommentToPost = (title, postId) => {
    const queryClient=useQueryClient()
    
    return useMutation({
        mutationFn: async () => {
            try {
                console.log(title)
                const url = `/api/v2/post/comment/${postId}`
                const res = await fetch(url, {
                    method: 'POST',
					headers: {
						"Content-Type": "application/json",
					},
                    body: JSON.stringify({title}) //title:title
                })
                const jsonData = await res.json();

                if (!res.ok) {
                    throw new Error(jsonData.msg || 'error')
                }
                return jsonData;
            }
            catch (error) {
                throw new Error(error.message || 'error')
            }
        },
		onSuccess: () => {
			toast.success("Comment posted successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
    })
}

export default useCommentToPost;