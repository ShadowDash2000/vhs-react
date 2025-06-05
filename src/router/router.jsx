import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../components/Layout.jsx";
import {Main} from "../components/pages/Main.jsx";
import {Login} from "../components/pages/Login.jsx";
import {Dashboard} from "../components/pages/Dashboard.jsx";
import {Video} from "../components/pages/Video.jsx";
import {VideoEdit} from "../components/pages/VideoEdit.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
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
                element: <Video/>,
                loader: ({params}) => {
                    return {params};
                },
            },
            {
                path: "/dashboard/video/:videoId",
                element: <VideoEdit/>,
                loader: ({params}) => {
                    return {params};
                },
            },
        ],
    }
])