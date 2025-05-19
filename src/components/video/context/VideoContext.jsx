import {createContext, useContext} from "react";
import {useAppContext} from "../../../context/AppContextProvider.jsx";

const VideoContext = createContext(null);

export const VideoProvider = ({video, children}) => {
    const {pb} = useAppContext();
    const imageId = video?.preview || video.defaultPreview;
    video.image = pb.files.getURL(video, imageId);

    return <VideoContext.Provider value={video}>
        {children}
    </VideoContext.Provider>
}

export const useVideo = () => useContext(VideoContext);