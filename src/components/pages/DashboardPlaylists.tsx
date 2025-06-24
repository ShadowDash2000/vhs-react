import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {Flex} from "@chakra-ui/react";
import DashboardHeader from "../dashboard/DashboardHeader";
import {PlaylistsProvider} from "@context/PlaylistsContext";
import {PlaylistListTable} from "../dashboard/PlaylisyListTable";

const DashboardPlaylists = () => {
    const {isAuth} = useAppContext();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, []);

    return (
        <PlaylistsProvider
            page={page}
            pageSize={20}
            options={{sort: "-created"}}
        >
            <Flex direction="column">
                <DashboardHeader/>
                <PlaylistListTable/>
            </Flex>
        </PlaylistsProvider>
    )
}

export default DashboardPlaylists;