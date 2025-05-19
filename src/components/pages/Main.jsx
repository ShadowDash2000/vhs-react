import {VideoList} from "../video/VideoList.jsx";
import {VideosProvider} from "../video/context/VideosContext.jsx";

export const Main = () => {
    return (
        <VideosProvider>
            <VideoList/>
        </VideosProvider>
    )
}