import {VideoList} from "../video/VideoList";
import {VideosInfiniteProvider} from "@context/VideosInfiniteContext";
import {Sort} from "@shared/hook/useSort";

const Main = () => {
    return (
        <VideosInfiniteProvider
            pageSize={24}
            initialSort={new Map([['created', Sort.DESC]])}
        >
            <VideoList/>
        </VideosInfiniteProvider>
    )
}

export default Main;