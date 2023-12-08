import { useUpdateOneUser } from "@/features/user/hooks";
import { RatedUser } from "@/features/user/model";
import Modal from "@/shared/ui/layout/Modal";
import styles from "./PositiveRatingModal.module.scss";
import PrimaryButton from "@/shared/ui/buttons/decorators/PrimaryButton";
import { PRIMARY_BUTTON_COLOR } from "@/shared/ui/buttons/decorators/PrimaryButton/PrimaryButton.tsx";
import { Button } from "@/shared/ui/buttons";
import { useActionMessages } from "@/shared/action-messages/store.ts";
import { ACTION_MESSAGE_TYPE } from "@/shared/action-messages/model/ActionMessage.ts";
import { useLogger } from "@/shared/logger";

type Props = {
    user: RatedUser;
}

const PositiveRatingModal = ({ user }: Props) => {
    const { log } = useLogger();
    const { addMessage } = useActionMessages();
    const updateUser = useUpdateOneUser(user);
    const handleClose = () => {
        updateUser((user) => user.rating--);
        log(`Отмена награждения пользователя ${user.username}. Понижение рейтинга до ${user.rating}.`);
    }
    const handleReward = () => {
        updateUser(user => {
            user.rating = 0;
            user.previousRating = 0;
            user.wasActive = false;
        });
        addMessage(ACTION_MESSAGE_TYPE.SUCCESS, `Пользователь ${user.username} успешно вознагражден!`);
        log(`Пользователь ${user.username} награжден.`);
    }
    return (
        <Modal active={user.rating > 5} onClose={() => updateUser((user) => user.rating--)} className={styles.positive_rating_modal}>
            <p>Нужно вознаградить { user.username }. Сделать это?</p>
            <div className={styles.positive_rating_modal__actions}>
                <PrimaryButton color={PRIMARY_BUTTON_COLOR.BLUE}>
                    <Button onClick={handleReward} className={styles.positive_rating_modal__action}>
                        Да
                    </Button>
                </PrimaryButton>
                <PrimaryButton color={PRIMARY_BUTTON_COLOR.RED}>
                    <Button onClick={handleClose} className={styles.positive_rating_modal__action}>
                        Нет
                    </Button>
                </PrimaryButton>
            </div>
        </Modal>
    );
}

export default PositiveRatingModal;
