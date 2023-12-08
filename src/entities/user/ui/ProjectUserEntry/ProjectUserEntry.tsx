import { PropsWithChildren } from "react";
import { ProjectUser } from "@/entities/user/model";
import styles from "./ProjectUserEntry.module.scss";
import { BlockProps, cn } from "@/shared/utils";

type Props = BlockProps<HTMLLIElement> & {
    user: ProjectUser;
}

const ProjectUserEntry = ({ user, children, ...props }: PropsWithChildren<Props>) => {
    return (
        <li className={cn(styles.project_user_entry, props.className)}>
            <span>{ user.first_name } { user.last_name }</span>
            <div className={styles.project_user_entry__actions}>
                { children }
            </div>
        </li>
    );
}

export default ProjectUserEntry;
