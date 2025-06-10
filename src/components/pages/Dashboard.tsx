import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {useNavigate} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {VideosListProvider} from "@context/VideosListContext";
import {VideoListTable} from "../dashboard/VideoListTable";

const Dashboard = () => {
    const {isAuth} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, []);

    return (
        <Suspense>
            <VideosListProvider pageSize={20}>
                <VideoListTable/>
            </VideosListProvider>
        </Suspense>
    )
}

export default Dashboard;