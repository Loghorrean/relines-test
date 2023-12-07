import styles from "./ModalButton.module.scss";
import { Button } from "@/src/shared/ui/buttons";
import { useModalContext } from "@/src/shared/ui/layout/Modal/context/ModalContext";
import BoldCloseIcon from "@/src/shared/ui/svg/actions/BoldCloseIcon";

const ModalButton = () => {
    const { onClose } = useModalContext();
    return (
        <Button className={styles.modal_button} onClick={onClose}>
            <BoldCloseIcon />
        </Button>
    );
};

export default ModalButton;
