import styles from "./AllUsersBlock.module.scss";
import { useMemo, useState } from "react";
import Loader from "@/shared/ui/loaders/Loader";
import { isValueEmpty } from "@/shared/utils";
import { useGetRatedUsersList } from "@/features/user/hooks";
import LoadMoreUsersButton from "@/features/user/ui/LoadMoreUsersButton/LoadMoreUsersButton.tsx";
import RefetchUsersListButton from "@/features/user/ui/RefetchUsersListButton/RefetchUsersListButton.tsx";
import ProjectUserEntry from "@/entities/user/ui/ProjectUserEntry";
import { appConfig } from "@/shared/configs/app.ts";
import UpdateRatingBlock from "@/features/user/ui/UpdateRatingBlock";

const AllUsersBlock = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading} = useGetRatedUsersList({ page: currentPage, size: appConfig.usersPerPage });
    const renderContent = useMemo(() => {
        console.log(data);
        if (isLoading) {
            return <div className={styles.all_users_block__loader_container}>
                <Loader dark />
            </div>;
        }
        if (isValueEmpty(data)) {
            return <div>Data is not found. Try again later.</div>;
        }
        return <ul className={styles.all_users_block__list}>
            { data.filter(item => item.rating === 0 && !item.wasActive).map(item => <ProjectUserEntry key={item.uid} user={item}>
                <UpdateRatingBlock user={item} showRating={false} />
            </ProjectUserEntry>) }
        </ul>;
    }, [isLoading, data]);
    return (
        <aside className={styles.all_users_block}>
            <RefetchUsersListButton onRefetch={() => setCurrentPage(1)} />
            { renderContent }
            <LoadMoreUsersButton page={currentPage} setPage={setCurrentPage} />
        </aside>
    );
}

export default AllUsersBlock;
