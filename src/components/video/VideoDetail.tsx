import {MediaPlayer, MediaPlayerInstance, MediaProvider, Poster, TextTrack} from '@vidstack/react';
import {defaultLayoutIcons, DefaultVideoLayout} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {Box, Heading} from "@chakra-ui/react";
import {useEffect, useMemo, useRef} from "react";
import {Collapse} from "@ui/collapse/collapse"
import {PrettyDescription} from "./PrettyDescription";
import {MediaContextProvider} from "@context/MediaContextProvider";
import {useCollectionOne} from "@context/CollectionOneContext";
import type {VideoRecord} from "@shared/types/types";

export const VideoDetail = () => {
    const {pb} = useAppContext();
    const {data: video} = useCollectionOne<VideoRecord>();
    const player = useRef<MediaPlayerInstance | null>(null);
    const track = useMemo(() => {
        if (!video.info?.chapters || !video.info?.duration) return null;

        const {duration, chapters} = video.info;

        const newTrack = new TextTrack({
            kind: 'chapters',
            type: 'vtt',
            default: true,
        });

        chapters.forEach((chapter, i) => {
            const endTime = i + 1 < chapters.length ? chapters[i + 1].start : duration;
            newTrack.addCue(new VTTCue(chapter.start, endTime, chapter.title));
        });

        return newTrack;
    }, []);

    useEffect(() => {
        if (!track) return;

        player.current?.textTracks.add(track);
        return () => {
            player.current?.textTracks.remove(track);
        }
    }, [track]);

    return (
        <Box maxW="100%" md={{maxW: "70%", maxH: "100%"}}>
            <MediaPlayer
                src={{
                    src: `${import.meta.env.VITE_PB_URL}/api/video/${video.id}/stream?token=${pb.authStore.token}`,
                    type: 'video/mp4',
                }}
                ref={player}
            >
                <MediaProvider>
                    <Poster src={pb.files.getURL(video, video.preview, {thumb: '1280x0'})}/>
                </MediaProvider>
                <DefaultVideoLayout
                    thumbnails={pb.files.getURL(video, video.webvtt)}
                    icons={defaultLayoutIcons}
                    slots={{
                        googleCastButton: null,
                    }}
                />
            </MediaPlayer>
            <MediaContextProvider ref={player}>
                <Heading size="xl" as="h1" py={2}>
                    {video.name}
                </Heading>
                {
                    video.description
                        ? <Collapse>
                            <PrettyDescription str={video.description}/>
                        </Collapse>
                        : null
                }
            </MediaContextProvider>
        </Box>
    )
}