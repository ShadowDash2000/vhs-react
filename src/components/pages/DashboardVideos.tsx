import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {VideoListTable} from "../dashboard/VideoListTable";
import {Flex} from "@chakra-ui/react";
import DashboardHeader from "../dashboard/DashboardHeader";
import {CollectionListProvider} from "@context/CollectionListContext";

const DashboardVideos = () => {
    const {pb, isAuth} = useAppContext();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, []);

    return (
        <CollectionListProvider
            collection={pb.collection('videos')}
            page={page}
            pageSize={20}
            options={{sort: "-created"}}
        >
            <Flex direction="column">
                <DashboardHeader/>
                <VideoListTable/>
            </Flex>
        </CollectionListProvider>
    )
}

export default DashboardVideos;