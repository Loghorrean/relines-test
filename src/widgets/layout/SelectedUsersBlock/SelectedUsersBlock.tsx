import styles from "./SelectedUsersBlock.module.scss";
import { useGetRatedUsersList } from "@/features/user/hooks";
import { useMemo } from "react";
import RatedUserEntry from "@/features/user/ui/RatedUserEntry";
import { useTemporaryRatedUsersStore } from "@/features/user/store/temporaryStore.ts";

const SelectedUsersBlock = () => {
    const { data} = useGetRatedUsersList();
    const { users } = useTemporaryRatedUsersStore();
    const selectedUsers = useMemo(() => {
        return users.length === 0 ? data : users;
    }, [data, users]);
    const positiveRated = useMemo(() => {
        return selectedUsers.filter(item => item.wasActive && (item.rating > 0 || (item.rating === 0 && item.previousRating > 0) ));
    }, [selectedUsers]);
    const negativeRated = useMemo(() => {
        return selectedUsers.filter(item => item.wasActive && (item.rating < 0 || (item.rating === 0 && item.previousRating < 0) ));
    }, [selectedUsers]);
    return (
        <section className={styles.selected_users_block}>
            <h1 className={styles.selected_users_block__heading}>Рейтинги пользователей</h1>
            <div className={styles.selected_users_block__content}>
                <h2>Положительный рейтинг</h2>
                <ul className={styles.selected_users_block__list}>
                    {positiveRated.map(item => <RatedUserEntry user={item} key={item.uid} />)}
                </ul>
            </div>
            <div className={styles.selected_users_block__content}>
                <h2>Отрицательный рейтинг</h2>
                <ul className={styles.selected_users_block__list}>
                    {negativeRated.map(item => <RatedUserEntry user={item} key={item.uid} />)}
                </ul>
            </div>
        </section>
    );
}

export default SelectedUsersBlock;
