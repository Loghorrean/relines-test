import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { createUserProvider } from "@/entities/user/api/di.ts";
import { RatedUser } from "@/features/user/model";
import { appConfig } from "@/shared/configs/app.ts";
import { isNotEmpty } from "@/shared/utils";

export type GetRatedUsersListInput = {
    page: number;
    size: number;
}

export const getRatedUsersListFn = async (input?: GetRatedUsersListInput) => {
    const userProvider = createUserProvider();
    const data = await userProvider.getUsersList(input?.page ?? 1, input?.size ?? appConfig.usersPerPage);
    return data.map(item => ({
        ...item,
        rating: 0,
        previousRating: 0,
        wasActive: false,
    }));
}

export const useGetRatedUsersList = (
    input?: GetRatedUsersListInput,
    options?: Omit<UseInfiniteQueryOptions<Array<RatedUser>>, "queryFn">
) => {
    const queryData = useInfiniteQuery({
        ...options,
        refetchOnWindowFocus: false,
        queryFn: () => getRatedUsersListFn(input),
        queryKey: options?.queryKey ?? ["users"],
        getNextPageParam: () => isNotEmpty(input?.page) ? input?.page + 1 : 1,
        initialPageParam: input?.page,
    });
    //TODO: RESOLVE THIS 'UNKNOWN' ISSUE
    const infiniteData = (queryData.data as unknown as InfiniteData<RatedUser[]>)?.pages.flat() ?? [];
    return {
        ...queryData,
        data: infiniteData
    }
};
