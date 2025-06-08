import {MediaPlayer, MediaPlayerInstance, MediaProvider, Poster, TextTrack} from '@vidstack/react';
import {defaultLayoutIcons, DefaultVideoLayout} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {useVideo} from "./context/VideoContext.tsx";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {Box, Collapsible} from "@chakra-ui/react";
import {useEffect, useRef} from "react";

export const VideoDetail = () => {
    const {pb} = useAppContext();
    const {data: video} = useVideo();

    const player = useRef<MediaPlayerInstance | null>(null);

    const track = new TextTrack({
        kind: 'chapters',
        type: 'vtt',
        default: true,
    });

    const duration = video.info.duration;
    const chaptersCount = video.info.chapters?.length || 0;
    for (let i = 0; i < chaptersCount; i++) {
        const chapter = video.info.chapters[i];
        const endTime = i + 1 > chaptersCount - 1 ? duration : video.info.chapters[i + 1].start;
        track.addCue(new VTTCue(chapter.start, endTime, chapter.title));
    }

    useEffect(() => {
        player.current?.textTracks.add(track);
    }, []);

    return (
        <Box maxW="100%" md={{maxW: "70%", maxH: "100%"}}>
            <MediaPlayer
                title={video.name}
                src={{
                    src: `${import.meta.env.VITE_PB_URL}/api/video/${video.id}/stream?token=${pb.authStore.token}`,
                    type: 'video/mp4',
                }}
                ref={player}
            >
                <MediaProvider>
                    <Poster src={pb.files.getURL(video, video.preview)}/>
                </MediaProvider>
                <DefaultVideoLayout
                    thumbnails={pb.files.getURL(video, video.webvtt)}
                    icons={defaultLayoutIcons}
                    slots={{
                        googleCastButton: null,
                    }}
                />
            </MediaPlayer>
            <Collapsible.Root>
                <Collapsible.Trigger paddingY="3">Toggle Collapsible</Collapsible.Trigger>
                <Collapsible.Content>
                    <Box padding="4" borderWidth="1px">
                        {video.description}
                    </Box>
                </Collapsible.Content>
            </Collapsible.Root>
        </Box>
    )
}