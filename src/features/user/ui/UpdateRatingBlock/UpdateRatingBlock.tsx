import styles from "./UpdateRatingBlock.module.scss";
import { Button } from "@/shared/ui/buttons";
import { RatedUser } from "@/features/user/model";
import { useUpdateOneUser } from "@/features/user/hooks";
import { useLogger } from "@/shared/logger";

type Props = {
    user: RatedUser;
    showRating?: boolean;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

const UpdateRatingBlock = ({ user, showRating = true, onIncrement, onDecrement }: Props) => {
    const { log } = useLogger();
    const updateUser = useUpdateOneUser(user);
    const handleIncrement = () => {
        updateUser(user => {
            user.previousRating = user.rating;
            user.rating++;
            user.wasActive = true;
        });
        log(`Рейтинг пользователя ${user.username} повышен до ${user.rating}`);
        onIncrement && onIncrement();
    }
    const handleDecrement = () => {
        updateUser(user => {
            user.previousRating = user.rating;
            user.rating--;
            user.wasActive = true;
        });
        log(`Рейтинг пользователя ${user.username} понижен до ${user.rating}`);
        onDecrement && onDecrement();
    }
    return (
        <div className={styles.update_user_rating_block}>
            <Button className={styles.update_user_rating_block__button} onClick={handleIncrement}>
                +
            </Button>
            { showRating && <div>
                {user.rating}
            </div> }
            <Button className={styles.update_user_rating_block__button} onClick={handleDecrement}>
                -
            </Button>
        </div>
    );
}

export default UpdateRatingBlock;
