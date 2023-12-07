import styles from "./Loader.module.scss";
import { resultIf } from "@/shared/utils";
import LoadingIcon from "@/shared/ui/svg/loading/LoadingIcon.tsx";

type Props = {
    dark?: boolean;
};

const Loader = ({ dark }: Props) => {
    return (
        <div className={styles.loader}>
            <LoadingIcon fill={resultIf(dark, "#000000")} />
        </div>
    );
};

export default Loader;
