import { PropsWithChildren } from "react";
import styles from "./PrimaryButton.module.scss";
import { cn, ObjectValues, resultIf } from "@/shared/utils";
import { ClassNameDecorator } from "@/shared/ui/decorators";
import { ClassInjector } from "@/shared/ui/injectors";

export const PRIMARY_BUTTON_COLOR = {
    BLACK: styles.primary_button___black,
    WHITE: styles.primary_button___white,
    BLUE: styles.primary_button___blue,
    RED: styles.primary_button___red,
} as const;

export type PrimaryButtonColor = ObjectValues<typeof PRIMARY_BUTTON_COLOR>;

interface Props {
    color?: PrimaryButtonColor;
    wide?: boolean;
    centered?: boolean;
    arrow?: boolean;
}

const PrimaryButton: ClassNameDecorator<PropsWithChildren<Props>> = ({
    color = PRIMARY_BUTTON_COLOR.BLACK,
    wide,
    centered = true,
    children,
    arrow = false,
    className,
}) => {
    return (
        <ClassInjector
            classNames={cn(
                styles.primary_button,
                color,
                resultIf(wide, styles.primary_button___wide),
                resultIf(centered, styles.primary_button___centered),
                resultIf(arrow, styles.primary_button___arrow)
            )}
            oldClassName={className}
        >
            {children}
        </ClassInjector>
    );
};

export default PrimaryButton;
