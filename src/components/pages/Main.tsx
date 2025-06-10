import {VideoList} from "../video/VideoList";
import {VideosInfiniteProvider} from "@context/VideosInfiniteContext";

const Main = () => {
    return (
        <VideosInfiniteProvider pageSize={24}>
            <VideoList/>
        </VideosInfiniteProvider>
    )
}

export default Main;