import styles from "./AllUsersBlock.module.scss";
import { useMemo, useState } from "react";
import Loader from "@/shared/ui/loaders/Loader";
import { isValueEmpty } from "@/shared/utils";
import { useGetRatedUsersList } from "@/features/user/hooks";
import LoadMoreUsersButton from "@/features/user/ui/LoadMoreUsersButton/LoadMoreUsersButton.tsx";
import RefetchUsersListButton from "@/features/user/ui/RefetchUsersListButton/RefetchUsersListButton.tsx";
import ProjectUserEntry from "@/entities/user/ui/ProjectUserEntry";
import { appConfig } from "@/shared/configs/app.ts";

const AllUsersBlock = () => {
    const [currentPage, setCurrentPage] = useState(1);
    //TODO: MAKE DYNAMIC SIZE AS OPTIONAL STUFF
    const { data, isLoading} = useGetRatedUsersList({ page: currentPage, size: appConfig.usersPerPage });
    console.log(data);
    const renderContent = useMemo(() => {
        if (isLoading) {
            return <div className={styles.all_users_block__loader_container}>
                <Loader dark />
            </div>;
        }
        if (isValueEmpty(data)) {
            return <div>Data is not found. Try again later.</div>;
        }
        return <ul className={styles.all_users_block__list}>
            { data.filter(item => item.rating === 0).map(item => <ProjectUserEntry key={item.uid} user={item} />) }
        </ul>;
    }, [isLoading, data]);
    return (
        <aside className={styles.all_users_block}>
            <RefetchUsersListButton />
            { renderContent }
            <LoadMoreUsersButton page={currentPage} setPage={setCurrentPage} />
        </aside>
    );
}

export default AllUsersBlock;
