import { useQuery } from "@tanstack/react-query";

const useFetchPostWithUrl = (url) => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                const res = await fetch(url)
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
}

export default useFetchPostWithUrl