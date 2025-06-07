import {useAppContext} from "../../context/AppContextProvider/AppContextProvider";
import {useNavigate} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {VideosProvider} from "../video/context/VideosContext.js";
import {VideoListTable} from "../dashboard/VideoListTable.jsx";

const Dashboard = () => {
    const {isAuth} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, []);

    return (
        <Suspense>
            <VideosProvider pageSize={20}>
                <VideoListTable flexDirection="row"/>
            </VideosProvider>
        </Suspense>
    )
}

export default Dashboard;