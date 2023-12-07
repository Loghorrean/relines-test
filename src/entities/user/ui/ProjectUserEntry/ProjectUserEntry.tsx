import { AllHTMLAttributes, PropsWithChildren } from "react";
import { ProjectUser } from "@/entities/user/model";
import styles from "./ProjectUserEntry.module.scss";
import { cn } from "@/shared/utils";

type Props = AllHTMLAttributes<HTMLLIElement> & {
    user: ProjectUser;
}

const ProjectUserEntry = ({ user, children, ...props }: PropsWithChildren<Props>) => {
    return (
        <li className={cn(styles.project_user_entry, props.className)}>
            { user.first_name } { user.last_name }
        </li>
    );
}

export default ProjectUserEntry;
