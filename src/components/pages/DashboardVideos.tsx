import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {VideosListProvider} from "@context/VideosListContext";
import {VideoListTable} from "../dashboard/VideoListTable";
import {Flex} from "@chakra-ui/react";
import DashboardHeader from "../dashboard/DashboardHeader";

const DashboardVideos = () => {
    const {isAuth} = useAppContext();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, []);

    return (
        <VideosListProvider
            page={page}
            pageSize={20}
            options={{sort: "-created"}}
        >
            <Flex direction="column">
                <DashboardHeader/>
                <VideoListTable/>
            </Flex>
        </VideosListProvider>
    )
}

export default DashboardVideos;