import { useUpdateOneUser } from "@/features/user/hooks";
import Modal from "@/shared/ui/layout/Modal";
import { RatedUser } from "@/features/user/model";
import styles from "./NegativeRatingModal.module.scss";
import PrimaryButton from "@/shared/ui/buttons/decorators/PrimaryButton";
import { PRIMARY_BUTTON_COLOR } from "@/shared/ui/buttons/decorators/PrimaryButton/PrimaryButton.tsx";
import { Button } from "@/shared/ui/buttons";
import { useActionMessages } from "@/shared/action-messages/store.ts";
import { ACTION_MESSAGE_TYPE } from "@/shared/action-messages/model/ActionMessage.ts";
import { useLogger } from "@/shared/logger";

type Props = {
    user: RatedUser;
}

const NegativeRatingModal = ({ user }: Props) => {
    const { log } = useLogger();
    const { addMessage } = useActionMessages();
    const updateUser = useUpdateOneUser(user);
    const handleClose = () => {
        updateUser((user) => user.rating++);
        log(`Отмена бана пользователя ${user.username}. Повышение рейтинга до ${user.rating}.`);
    }
    const handleBan = () => {
        updateUser(user => {
            user.rating = 0;
            user.previousRating = 0;
            user.wasActive = false;
        });
        addMessage(ACTION_MESSAGE_TYPE.SUCCESS, `Пользователь ${user.username} успешно забанен!`);
        log(`Пользователь ${user.username} забанен.`);
    }
    return (
        <Modal active={user.rating <= -5} onClose={handleClose} className={styles.negative_rating_modal}>
            <p>Пора забанить { user.username }. Сделать это?</p>
            <div className={styles.negative_rating_modal__actions}>
                <PrimaryButton color={PRIMARY_BUTTON_COLOR.BLUE}>
                    <Button onClick={handleBan} className={styles.negative_rating_modal__action}>
                        Да
                    </Button>
                </PrimaryButton>
                <PrimaryButton color={PRIMARY_BUTTON_COLOR.RED}>
                    <Button onClick={handleClose} className={styles.negative_rating_modal__action}>
                        Нет
                    </Button>
                </PrimaryButton>
            </div>
        </Modal>
    );
}

export default NegativeRatingModal;
