import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import Main from "../components/pages/Main";
import {lazy} from "react";

const VideoEdit = lazy(() => import("../components/pages/VideoEdit"));
const Video = lazy(() => import("../components/pages/Video"));
const Dashboard = lazy(() => import("../components/pages/Dashboard"));
const Login = lazy(() => import("../components/pages/Login"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Main/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/dashboard",
                element: <Dashboard/>,
            },
            {
                path: "/video/:videoId",
                element: <Video/>
            },
            {
                path: "/dashboard/video/:videoId",
                element: <VideoEdit/>
            },
        ],
    }
])