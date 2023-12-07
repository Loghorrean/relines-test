import { SVGAttributes } from "react";
import { SvgContainerSize } from "@/shared/ui/svg/SvgContainer/SvgContainer.tsx";

export type SvgProps = SVGAttributes<SVGElement> & {
    size?: SvgContainerSize;
};
