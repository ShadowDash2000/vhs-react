import {VideoList} from "../video/VideoList.jsx";
import {VideosProvider} from "../video/context/VideosContext.js";

const Main = () => {
    return (
        <VideosProvider pageSize={24}>
            <VideoList/>
        </VideosProvider>
    )
}

export default Main;