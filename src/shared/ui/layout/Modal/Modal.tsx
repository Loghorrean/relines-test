"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import ModalContextProvider, { ModalContextType } from "./context/ModalContext";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./Modal.module.scss";
import { useBodyOverflow } from "@/shared/utils/hooks";
import { BlockProps, ClosableElementProps, cn } from "@/shared/utils";
import { Button } from "@/shared/ui/buttons";
import CloseIcon from "@/shared/ui/svg/actions/CloseIcon.tsx";

export type ModalProps = BlockProps & ClosableElementProps;

const Modal = ({ active, onClose, children, ...props }: PropsWithChildren<ModalProps>) => {
    useBodyOverflow(active);
    const elRef = useRef<HTMLElement | null>(null);
    const [domReady, setDomReady] = useState(false);

    useEffect(() => {
        setDomReady(true);
        if (elRef.current === null) {
            elRef.current = document.getElementById("modal-container");
        }
    }, []);

    const value: ModalContextType = {
        onClose: onClose,
    };
    return (
        <>
            {domReady &&
                createPortal(
                    <>
                        <CSSTransition
                            in={active}
                            timeout={500}
                            classNames={{
                                enter: styles.modal__overlay___enter,
                                enterActive: styles.modal__overlay___enter_active,
                                enterDone: styles.modal__overlay___enter_done,
                                exit: styles.modal__overlay___exit,
                                exitActive: styles.modal__overlay___exit_active,
                                exitDone: styles.modal__overlay___exit_done,
                            }}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div className={styles.modal__overlay} onClick={onClose}></div>
                        </CSSTransition>
                        <CSSTransition
                            in={active}
                            timeout={500}
                            classNames={{
                                enter: styles.modal___enter,
                                enterActive: styles.modal___enter_active,
                                enterDone: styles.modal___enter_done,
                                exit: styles.modal___exit,
                                exitActive: styles.modal___exit_active,
                                exitDone: styles.modal___exit_done,
                            }}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div
                                {...props}
                                className={cn(styles.modal, props.className)}
                                aria-hidden={!active}
                                aria-describedby="modal-description"
                                onClick={event => event.stopPropagation()}
                            >
                                <ModalContextProvider {...value}>
                                    <p className={styles.modal__screen_reader} id="modal-description">
                                        This is a dialog window which overlays the main content of the page. You can
                                        press &apos;Esc&apos; on your keyboard or click anywhere outside this block to
                                        close it.
                                    </p>
                                    <div className={styles.modal__content}>
                                        <Button className={styles.modal__close} onClick={onClose}>
                                            <CloseIcon />
                                        </Button>
                                        {children}
                                    </div>
                                </ModalContextProvider>
                            </div>
                        </CSSTransition>
                    </>,
                    elRef.current!
                )}
        </>
    );
};

export default Modal;
