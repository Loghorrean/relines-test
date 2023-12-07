import React from "react";
import styles from "./PageLoader.module.scss";
import { cn, resultIf } from "crowdsoft-utils-lib";

type Props = {
    fixed?: boolean;
};

const PageLoader = ({ fixed }: Props) => {
    return (
        <div className={cn(styles.page_loader, resultIf(fixed, styles.page_loader___fixed))}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default PageLoader;
