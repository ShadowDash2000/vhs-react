import {createContext, useContext} from "react";
import {useAppContext} from "../../../context/AppContextProvider.jsx";

const VideoDetailContext = createContext(null);

export const VideoDetailProvider = ({video, children}) => {
    const {pb} = useAppContext();
    const imageId = video?.preview || video.defaultPreview;
    video.image = pb.files.getURL(video, imageId);

    return <VideoDetailContext.Provider value={video}>
        {children}
    </VideoDetailContext.Provider>
}

export const useVideoDetail = () => useContext(VideoDetailContext);