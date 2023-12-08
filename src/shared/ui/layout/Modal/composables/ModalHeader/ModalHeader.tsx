import { useModalContext } from "@/src/shared/ui/layout/Modal/context/ModalContext";
import styles from "./ModalHeader.module.scss";
import { ReactNode } from "react";
import { Button } from "@/src/shared/ui/buttons";
import CloseIcon from "@/src/shared/ui/svg/common/CloseIcon";
import { BlockProps } from "@/src/shared/utils";
import { cn } from "crowdsoft-utils-lib";

type Props = BlockProps & {
    heading: ReactNode;
    closes?: boolean;
};

const ModalHeader = ({ heading, closes = true, ...props }: Props) => {
    const { onClose } = useModalContext();
    return (
        <header {...props} className={cn(styles.modal_header, props.className)}>
            <p className={styles.modal_header__heading}>{heading}</p>
            {closes ? (
                <Button onClick={onClose} className={styles.modal_header__button}>
                    <CloseIcon />
                </Button>
            ) : (
                <div></div>
            )}
        </header>
    );
};

export default ModalHeader;
