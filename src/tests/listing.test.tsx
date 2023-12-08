import { waitFor, renderHook } from "@testing-library/react";
import { useGetRatedUsersMock } from "@/tests/mock/useGetRatedUsersMock.ts";
import Providers from "@/main/providers/Providers.tsx";
import * as nock from "nock";
import { generatePaginatedResponse } from "@/tests/mock/provideMockData.ts";
import { InfiniteData } from "@tanstack/react-query";
import { RatedUser } from "@/features/user/model";

test("Basic data loading", async () => {
    const wrapper = ({ children }: any) => (
        <Providers>
            {children}
        </Providers>
    );
    const { result } = renderHook(() => useGetRatedUsersMock(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBeDefined()
});

test("Infinite data loading", async () => {
    const wrapper = ({ children }: any) => (
        <Providers>
            {children}
        </Providers>
    );

    const expectation = nock('https://random-data-api.com')
        .persist()
        .get('/api/data')
        .reply(200, (uri) => {
            const url = new URL(`https://random-data-api.com/api/users/random_user?page=${uri}`);
            const { page } = Object.fromEntries(url.searchParams);
            return generatePaginatedResponse(parseInt(page));
        });

    const { result } = renderHook(
        () => useGetRatedUsersMock({ page: 1, size: 5 }),
        { wrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // Incorrect typing from inner react query logic, even static typing from Typescript does not know, what is going on
    // and shows incorrect type, so had to cast.
    const data = result.current.data?.pages as unknown as Array<InfiniteData<RatedUser>>;
    const paginatedResponse = await generatePaginatedResponse(1);

    expect(data[0].pages).toStrictEqual(paginatedResponse);

    expectation.done();
});