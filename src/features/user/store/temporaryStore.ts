import { atom } from "jotai/index";
import { RatedUser } from "@/features/user/model";
import { useAtom } from "jotai";

const temporaryRatedUsersAtom = atom<RatedUser[]>([]);

export const useTemporaryRatedUsersStore = () => {
    const [users, setUsers] = useAtom(temporaryRatedUsersAtom);
    return {
        users,
        setUsers
    };
}