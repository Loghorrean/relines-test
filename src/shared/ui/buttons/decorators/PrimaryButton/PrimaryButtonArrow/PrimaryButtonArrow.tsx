import styles from "./PrimaryButtonArrow.module.scss";
import { cn, ObjectValues } from "crowdsoft-utils-lib";
import ArrowTopRight from "@/src/shared/ui/svg/arrows/ArrowTopRight";

export const PRIMARY_BUTTON_ARROW_COLOR = {
    WHITE: styles.primary_button_arrow___white,
    BLACK: styles.primary_button_arrow___black,
    GRAY: styles.primary_button_arrow___gray,
    BLUE: styles.primary_button_arrow___blue,
} as const;

export type PrimaryButtonArrowColor = ObjectValues<typeof PRIMARY_BUTTON_ARROW_COLOR>;

type Props = {
    color: PrimaryButtonArrowColor;
};

const PrimaryButtonArrow = ({ color }: Props) => {
    return (
        <span className={cn(styles.primary_button_arrow, color)}>
            <ArrowTopRight />
        </span>
    );
};

export default PrimaryButtonArrow;
