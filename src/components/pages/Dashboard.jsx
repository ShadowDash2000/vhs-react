import {useAppContext} from "../../context/AppContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import {QueryErrorResetBoundary} from "@tanstack/react-query";
import {Suspense, useEffect} from "react";
import {LuLoader} from "react-icons/lu";
import {ErrorBoundary} from "react-error-boundary";
import {Videos} from "../dashboard/Videos.jsx";

export const Dashboard = () => {
    const {isAuth} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate('/login');
    });

    return (
        <QueryErrorResetBoundary>
            {() => (
                <ErrorBoundary
                    fallbackRender={() => (
                        <div>
                            There was an error!
                        </div>
                    )}
                >
                    <Suspense fallback={<LuLoader/>}>
                        <Videos flexDirection="row"/>
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    )
}