import {useAppContext} from "../../context/AppContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {VideoListTable} from "../video/VideoListTable.jsx";
import {VideosProvider} from "../video/context/VideosContext.jsx";

export const Dashboard = () => {
    const {isAuth} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate('/login');
    });

    return (
        <VideosProvider>
            <VideoListTable flexDirection="row"/>
        </VideosProvider>
    )
}