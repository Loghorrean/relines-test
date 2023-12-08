import styles from "./RatedUserEntry.module.scss";
import ProjectUserEntry from "@/entities/user/ui/ProjectUserEntry";
import { RatedUser } from "@/features/user/model";
import UpdateRatingBlock from "@/features/user/ui/UpdateRatingBlock";
import DeactivateUserButton from "@/features/user/ui/DeactivateUserButton";
import PositiveRatingModal from "@/features/user/ui/modals/PositiveRatingModal";
import NegativeRatingModal from "@/features/user/ui/modals/NegativeRatingModal";

type Props = {
    user: RatedUser;
}

const RatedUserEntry = ({ user }: Props) => {
    return (
        <ProjectUserEntry user={user} className={styles.rated_user_entry}>
            { user.rating === 0 && <DeactivateUserButton user={user} /> }
            <UpdateRatingBlock user={user} />
            <PositiveRatingModal user={user} />
            <NegativeRatingModal user={user} />
        </ProjectUserEntry>
    );
}

export default RatedUserEntry;
