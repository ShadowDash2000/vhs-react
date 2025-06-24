import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import Main from "../components/pages/Main";
import {lazy} from "react";
import PlaylistEdit from "../components/pages/PlaylistEdit";

const VideoEdit = lazy(() => import("../components/pages/VideoEdit"));
const Video = lazy(() => import("../components/pages/Video"));
const DashboardVideos = lazy(() => import("../components/pages/./DashboardVideos"));
const DashboardPlaylists = lazy(() => import("../components/pages/./DashboardPlaylists"));
const Login = lazy(() => import("../components/pages/Login"));
const Playlists = lazy(() => import("../components/pages/Playlists"));
const Playlist = lazy(() => import("../components/pages/Playlist"));


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
                element: <DashboardVideos/>,
            },
            {
                path: "/dashboard/playlists",
                element: <DashboardPlaylists/>,
            },
            {
                path: "/video/:videoId",
                element: <Video/>
            },
            {
                path: "/dashboard/video/:videoId",
                element: <VideoEdit/>
            },
            {
                path: "/dashboard/playlist/:playlistId",
                element: <PlaylistEdit/>
            },
            {
                path: "/playlists",
                element: <Playlists/>
            },
            {
                path: "/playlists/:playlistId",
                element: <Playlist/>
            },
        ],
    }
])