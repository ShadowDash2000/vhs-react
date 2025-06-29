import {useParams, useSearchParams} from "react-router-dom";
import {VideoDetail} from "../video/VideoDetail";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {CollectionOneProvider} from "@context/CollectionOneContext";

const Video = () => {
    const {videoId} = useParams();
    if (!videoId) return null;

    const [searchParams] = useSearchParams();
    const time = parseInt(searchParams.get('t') || '0');

    const {pb} = useAppContext();

    return (
        <CollectionOneProvider
            collection={pb.collection('videos')}
            recordId={videoId}
        >
            <VideoDetail time={time}/>
        </CollectionOneProvider>
    )
}

export default Video;