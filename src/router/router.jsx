import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../components/Layout.jsx";
import {Main} from "../components/pages/Main.jsx";
import {Login} from "../components/pages/Login.jsx";
import {Dashboard} from "../components/pages/Dashboard.jsx";

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
        ],
    }
])