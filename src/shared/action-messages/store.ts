import { atom } from "jotai/index";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { ActionMessage, ActionMessageType } from "@/shared/action-messages/model/ActionMessage";

const actionMessagesAtom = atom<Array<ActionMessage>>([]);

//Пользовательские уведомления, решил добавить для лучшего UX
export const useActionMessages = () => {
    const [messages, setMessages] = useAtom(actionMessagesAtom);
    const removeMessage = useCallback((id: number) => {
        setMessages(messages => messages.filter(error => error.id !== id));
        clearTimeout(id);
    }, []);
    const addMessage = useCallback((type: ActionMessageType, text: string, timeout = 7) => {
        if (typeof window !== undefined) {
            let timeoutId = 0;
            timeoutId = window.setTimeout(() => {
                removeMessage(timeoutId);
            }, timeout * 1000);
            setMessages(messages => [...messages, { id: timeoutId, type, description: text }]);
        }
    }, []);
    return {
        getMessages() {
            return messages;
        },
        removeMessage,
        addMessage,
        addMessagesBulk(type: ActionMessageType, texts: Array<string>) {
            if (typeof window !== undefined) {
                texts.forEach(text => addMessage(type, text));
            }
        },
    };
};
