import {useAppContext} from "../../context/AppContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {VideosProvider} from "../video/context/VideosContext.jsx";
import {VideoListTable} from "../dashboard/VideoListTable.jsx";

export const Dashboard = () => {
    const {isAuth} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate('/login');
    });

    return (
        <VideosProvider pageSize={20}>
            <VideoListTable flexDirection="row"/>
        </VideosProvider>
    )
}