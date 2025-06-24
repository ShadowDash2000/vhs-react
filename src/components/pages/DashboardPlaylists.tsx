import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {Flex} from "@chakra-ui/react";
import DashboardHeader from "../dashboard/DashboardHeader";
import {PlaylistListTable} from "../dashboard/PlaylisyListTable";
import {CollectionListProvider} from "@context/CollectionListContext";

const DashboardPlaylists = () => {
    const {pb, isAuth} = useAppContext();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, []);

    return (
        <CollectionListProvider
            collection={pb.collection('playlists')}
            page={page}
            pageSize={20}
            options={{sort: "-created"}}
        >
            <Flex direction="column">
                <DashboardHeader/>
                <PlaylistListTable/>
            </Flex>
        </CollectionListProvider>
    )
}

export default DashboardPlaylists;