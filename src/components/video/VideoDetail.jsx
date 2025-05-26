import {MediaPlayer, MediaProvider} from '@vidstack/react';
import {defaultLayoutIcons, DefaultVideoLayout} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {useVideo} from "./context/VideoContext.jsx";
import {useAppContext} from "../../context/AppContextProvider.jsx";

export const VideoDetail = () => {
    const {pb} = useAppContext();
    const video = useVideo();

    return (
        <MediaPlayer
            title={video.name}
            src={{
                src: `${import.meta.env.VITE_PB_URL}/api/video/${video.id}/stream?token=${pb.authStore.token}`,
                type: 'video/mp4',
            }}
        >
            <MediaProvider/>
            <DefaultVideoLayout
                thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                icons={defaultLayoutIcons}
            />
        </MediaPlayer>
    )
}