"use client";

import styles from "./ActionMessageElement.module.scss";
import { ReactElement, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { ACTION_MESSAGE_TYPE, ActionMessage, ActionMessageType } from "@/shared/action-messages/model/ActionMessage.ts";
import ErrorMessageIcon from "@/shared/action-messages/ui/icons/ErrorMessageIcon.tsx";
import SuccessMessageIcon from "@/shared/action-messages/ui/icons/SuccessMessageIcon.tsx";
import { useActionMessages } from "@/shared/action-messages/store.ts";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/ui/buttons";
import CloseIcon from "@/shared/ui/svg/actions/CloseIcon.tsx";

interface Props {
    message: ActionMessage;
}

const signsMap: Record<ActionMessageType, { icon: ReactElement; className: string }> = {
    [ACTION_MESSAGE_TYPE.ERROR]: {
        icon: <ErrorMessageIcon />,
        className: styles.error_element___error,
    },
    [ACTION_MESSAGE_TYPE.SUCCESS]: {
        icon: <SuccessMessageIcon />,
        className: styles.error_element___success,
    },
} as const;

const ActionMessageElement = ({ message }: Props) => {
    const { getMessages, removeMessage } = useActionMessages();
    const nodeRef = useRef(null);
    return (
        <CSSTransition
            in={getMessages().filter(currentMessage => message.id === currentMessage.id).length > 0}
            timeout={500}
            classNames={{
                enter: styles.error_element___enter,
                enterActive: styles.error_element___enter_active,
                enterDone: styles.error_element___enter_done,
                exit: styles.error_element___exit,
                exitActive: styles.error_element___exit_active,
                exitDone: styles.error_element___exit_done,
            }}
            nodeRef={nodeRef}
            mountOnEnter
            unmountOnExit
        >
            <li className={cn(styles.error_element, signsMap[message.type].className)} ref={nodeRef} role="status">
                <div className={styles.error_element__inner}>
                    {signsMap[message.type].icon}
                    <p>{message.description}</p>
                    <Button onClick={() => removeMessage(message.id)} className={styles.error_element__button}>
                        <CloseIcon />
                    </Button>
                </div>
            </li>
        </CSSTransition>
    );
};

export default ActionMessageElement;
