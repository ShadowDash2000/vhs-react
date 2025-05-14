import {Suspense} from "react";
import {LuLoader} from "react-icons/lu";
import {QueryErrorResetBoundary} from "@tanstack/react-query";
import {ErrorBoundary} from 'react-error-boundary'
import {Videos} from "../Videos.jsx";

export const Main = () => {
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
                        <Videos/>
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    )
}