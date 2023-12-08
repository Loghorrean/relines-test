import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { RatedUser } from "@/features/user/model";
import { isNotEmpty } from "@/shared/utils";
import { generatePaginatedResponse } from "@/tests/mock/provideMockData.ts";

export type GetRatedUsersListInput = {
    page: number;
    size: number;
}

export const getRatedUsersListFn = async ({ page }: GetRatedUsersListInput): Promise<InfiniteData<RatedUser>> => {
    const data = await generatePaginatedResponse(page);
    const mapped = data.map(item => ({
        ...item,
        rating: 0,
        previousRating: 0,
        wasActive: false,
    }));
    return {
        pages: mapped,
        pageParams: []
    }
}

export const useGetRatedUsersMock = (
    input?: GetRatedUsersListInput,
    options?: Omit<UseInfiniteQueryOptions<InfiniteData<RatedUser>>, "queryFn">
) => {
    return useInfiniteQuery({
        ...options,
        refetchOnWindowFocus: false,
        queryFn: () => getRatedUsersListFn({ page: input?.page ?? 1, size: input?.size ?? 5 }),
        queryKey: options?.queryKey ?? ["users"],
        getNextPageParam: () => isNotEmpty(input?.page) ? input?.page + 1 : 1,
        initialPageParam: input?.page,
    });
};
