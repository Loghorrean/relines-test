import PrimaryButton from "@/shared/ui/buttons/decorators/PrimaryButton";
import { PRIMARY_BUTTON_COLOR } from "@/shared/ui/buttons/decorators/PrimaryButton/PrimaryButton.tsx";
import { Button } from "@/shared/ui/buttons";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { RatedUser } from "@/features/user/model";
import { chunkArray, isValueEmpty } from "@/shared/utils";
import { appConfig } from "@/shared/configs/app.ts";
import { useGetRatedUsersList } from "@/features/user/hooks";
import Loader from "@/shared/ui/loaders/Loader";

const RefetchUsersListButton = () => {
    const { refetch, isRefetching } = useGetRatedUsersList({ page: 1, size: appConfig.usersPerPage });
    const client = useQueryClient();
    const handleRefetch = async () => {
        const oldData = client.getQueryData<InfiniteData<RatedUser[]>>(["users"]);
        if (isValueEmpty(oldData)) {
            return;
        }
        const flatted = oldData.pages.flat();
        const filteredData = chunkArray(flatted.filter(item => item.rating !== 0));
        const pageParams = [];
        //TODO: REMOVE MAGIC NUMBER
        for (let i = 0; i < filteredData.length % appConfig.usersPerPage; ++i) {
            pageParams.push(i + 1);
        }
        client.setQueryData<InfiniteData<RatedUser[]>>(["users"], {
            pages: filteredData,
            pageParams
        });
        await refetch();
    }
    return (
        <PrimaryButton color={PRIMARY_BUTTON_COLOR.RED}>
            <Button onClick={handleRefetch}>
                { isRefetching ? <Loader /> : "Обновить список" }
            </Button>
        </PrimaryButton>
    );
}

export default RefetchUsersListButton;
