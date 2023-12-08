import { Button } from "@/shared/ui/buttons";
import styles from "./DeactivateUserButton.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { RatedUser } from "@/features/user/model";
import { InfiniteData } from "@tanstack/react-query/build/modern";
import { chunkArray, isValueEmpty } from "@/shared/utils";
import { useLogger } from "@/shared/logger";

type Props = {
    user: RatedUser;
}

const DeactivateUserButton = ({ user }: Props) => {
    const { log } = useLogger();
    const client = useQueryClient();
    const handleClick = () => {
        const oldData = client.getQueryData<InfiniteData<RatedUser[]>>(["users"]);
        if (isValueEmpty(oldData)) {
            return;
        }
        log(`Пользователь ${user.username} удален из активных.`);
        client.setQueryData(["users"], (previous: InfiniteData<RatedUser[], number> | undefined) => {
            const flatted = previous!.pages.flat();
            flatted.map(current => {
                if (current.uid === user.uid) {
                    current.previousRating = 0;
                    current.rating = 0;
                    current.wasActive = false;
                }
            });
            return {
                pages: chunkArray(flatted),
                pageParams: previous?.pageParams
            }
        });
    }
    return (
        <Button className={styles.deactivate_user_button} onClick={handleClick}>
            Удалить
        </Button>
    );
}

export default DeactivateUserButton;
