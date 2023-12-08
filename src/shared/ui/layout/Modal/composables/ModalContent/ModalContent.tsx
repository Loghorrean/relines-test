import styles from "./ModalContent.module.scss";
import { PropsWithChildren } from "react";
import { BlockProps } from "@/src/shared/utils";
import { cn } from "crowdsoft-utils-lib";

const ModalContent = ({ children, className, ...props }: PropsWithChildren<BlockProps>) => {
    return (
        <div {...props} className={cn(styles.modal_content, className)}>
            {children}
        </div>
    );
};

export default ModalContent;
