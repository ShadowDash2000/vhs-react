import {useParams} from "react-router-dom";
import {VideoDetail} from "../video/VideoDetail";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {CollectionOneProvider} from "@context/CollectionOneContext";

const Video = () => {
    const {videoId} = useParams();
    if (!videoId) return null;

    const {pb} = useAppContext();

    return (
        <CollectionOneProvider
            collection={pb.collection('videos')}
            recordId={videoId}
        >
            <VideoDetail/>
        </CollectionOneProvider>
    )
}

export default Video;