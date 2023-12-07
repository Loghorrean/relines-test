import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { createUserProvider } from "@/entities/user/api/di.ts";
import { RatedUser } from "@/features/user/model";

export type GetRatedUsersListInput = {
    page: number;
    size: number;
}

export const useGetRatedUsersList = (
    input: GetRatedUsersListInput,
    options?: Omit<UseInfiniteQueryOptions<Array<RatedUser>>, "queryFn">
) => {
    const { page, size } = input;
    const queryData = useInfiniteQuery({
        ...options,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const userProvider = createUserProvider();
            const data = await userProvider.getUsersList(page, size);
            return data.map(item => ({
                ...item,
                rating: 0
            }))
        },
        queryKey: options?.queryKey ?? ["users"],
        getNextPageParam: () => page + 1,
        initialPageParam: page,
    });
    //TODO: RESOLVE THIS 'ANY' ISSUE
    const infiniteData = (queryData.data as any as InfiniteData<RatedUser[]>)?.pages.flat() ?? [];
    return {
        ...queryData,
        data: infiniteData
    }
};
