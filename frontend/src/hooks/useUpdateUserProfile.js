import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateUserProfile = (email, bio, fullname, country, link) => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const url = "/api/v2/user/update";
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email, bio, fullname, country, link
                    })
                });
                if (!response.ok) {
                    throw new Error(jsonData.msg || 'error')
                }
            } catch (error) {
                throw new Error(error.message || "Something went Wrong!")
            }
        },
        onSuccess: () => {
            toast.success("Profile updated sucessfully!");
            Promise.all([
                client.invalidateQueries({ queryKey: ["authUser"] }),
                client.invalidateQueries({ queryKey: ["userProfile"] }),
            ]);
        },
        onError: () => {
            toast.error("Something went Wrong!");
        }
    });
}

export default useUpdateUserProfile;