import { ObjectValues } from "crowdsoft-utils-lib";

export const ACTION_MESSAGE_TYPE = {
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
} as const;

export type ActionMessageType = ObjectValues<typeof ACTION_MESSAGE_TYPE>;

export interface ActionMessage {
    id: number;
    type: ActionMessageType;
    description: string;
}
