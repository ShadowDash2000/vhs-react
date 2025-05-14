import {useAppContext} from "../context/AppContextProvider.jsx";
import {useSuspenseQuery} from "@tanstack/react-query";

const collectionName = 'users';

export const useUsers = () => {
    const {pb} = useAppContext();

    return useSuspenseQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const users = await pb.collection(collectionName).getFullList();

            const usersMap = new Map();
            users.forEach((user) => usersMap.set(user.id, user));
            return usersMap;
        },
    });
}

export const useUserByLogin = (login) => {
    const {data: users, ...rest} = useUsers();
    let userRes = null;

    if (users) {
        for (const [id, user] of users.entries()) {
            if (user.name === login) {
                userRes = user;
                break;
            }
        }
    }

    return {user: userRes, ...rest};
}

export const useUserById = (id) => {
    const {data: users, ...rest} = useUsers();
    const user = users?.get(id);
    return {user, ...rest};
}