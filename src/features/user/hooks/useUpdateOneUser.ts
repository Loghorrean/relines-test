import { RatedUser } from "@/features/user/model";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { chunkArray, isValueEmpty } from "@/shared/utils";

export const useUpdateOneUser = (user: RatedUser) => {
    const client = useQueryClient();
    return (cb: (user: RatedUser) => unknown) => {
        const oldData = client.getQueryData<InfiniteData<RatedUser[]>>(["users"]);
        if (isValueEmpty(oldData)) {
            return;
        }
        client.setQueryData(["users"], (previous: InfiniteData<RatedUser[], number> | undefined) => {
            const flatted = previous!.pages.flat();
            for (let i = 0; i < flatted.length; ++i) {
                if (flatted[i].uid === user.uid) {
                    cb(flatted[i]);
                    break;
                }
            }
            return {
                pages: chunkArray(flatted),
                pageParams: previous?.pageParams
            }
        });
    }
}