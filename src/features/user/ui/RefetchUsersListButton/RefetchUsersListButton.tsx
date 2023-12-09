import PrimaryButton from "@/shared/ui/buttons/decorators/PrimaryButton";
import { PRIMARY_BUTTON_COLOR } from "@/shared/ui/buttons/decorators/PrimaryButton/PrimaryButton.tsx";
import { Button } from "@/shared/ui/buttons";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { RatedUser } from "@/features/user/model";
import { chunkArray, isNotEmpty, isValueEmpty } from "@/shared/utils";
import { appConfig } from "@/shared/configs/app.ts";
import { useGetRatedUsersList } from "@/features/user/hooks";
import Loader from "@/shared/ui/loaders/Loader";
import { useLogger } from "@/shared/logger";
import { useTemporaryRatedUsersStore } from "@/features/user/store/temporaryStore.ts";

type Props = {
    onRefetch: () => void;
}

const RefetchUsersListButton = ({ onRefetch }: Props) => {
    const { setUsers } = useTemporaryRatedUsersStore();
    const { log } = useLogger();
    const { refetch, isRefetching} = useGetRatedUsersList({ page: 1, size: appConfig.usersPerPage });
    const client = useQueryClient();
    const handleRefetch = async () => {
        const oldData = client.getQueryData<InfiniteData<RatedUser[]>>(["users"]);
        if (isValueEmpty(oldData)) {
            return;
        }
        // возьмем юзеров, рейтинг которых мы меняли, удалим старые данные, получим новые и соединим с теми юзерами
        const filteredData = oldData.pages.flat().filter(item => item.wasActive);
        setUsers(filteredData);
        client.setQueryData(["users"], () => {
            return {
                pages: chunkArray(filteredData),
                pageParams: []
            }
        });
        await client.removeQueries({ queryKey: ["users"] });
        await refetch();
        client.setQueryData(["users"], (previous: InfiniteData<RatedUser[], number> | undefined) => {
            return {
                pages: isNotEmpty(previous) ? chunkArray((previous.pages.flat()).concat(filteredData)) : filteredData,
                pageParams: [1]
            }
        });
        setUsers([]);
        log("Пользователи обновлены.");
        onRefetch();
    }
    return (
        <PrimaryButton color={PRIMARY_BUTTON_COLOR.RED}>
            <Button onClick={handleRefetch} disabled={isRefetching}>
                { isRefetching ? <Loader /> : "Обновить список" }
            </Button>
        </PrimaryButton>
    );
}

export default RefetchUsersListButton;
