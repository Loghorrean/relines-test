import PrimaryButton from "@/shared/ui/buttons/decorators/PrimaryButton";
import { PRIMARY_BUTTON_COLOR } from "@/shared/ui/buttons/decorators/PrimaryButton/PrimaryButton.tsx";
import { Button } from "@/shared/ui/buttons";
import { useGetRatedUsersList } from "@/features/user/hooks";
import Loader from "@/shared/ui/loaders/Loader";
import { Dispatch, SetStateAction } from "react";
import { useLogger } from "@/shared/logger";

type Props = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

const LoadMoreUsersButton = ({ page, setPage }: Props) => {
    const { log } = useLogger();
    const { fetchNextPage, isFetchingNextPage} = useGetRatedUsersList({ page, size: 5 });
    const handleLoadMore = async () => {
        setPage(page => page + 1);
        await fetchNextPage();
        log("Новые пользователи загружены.");
    }
    return (
        <PrimaryButton color={PRIMARY_BUTTON_COLOR.BLUE}>
            <Button onClick={handleLoadMore}>
                { isFetchingNextPage ? <Loader /> : "Следующая страница" }
            </Button>
        </PrimaryButton>
    );
}

export default LoadMoreUsersButton;
