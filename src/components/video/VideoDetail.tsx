import {
    MediaPlayer,
    MediaPlayerInstance,
    MediaProvider,
    TextTrack,
} from '@vidstack/react';
import {defaultLayoutIcons, DefaultVideoLayout} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {Box, Flex, Heading} from "@chakra-ui/react";
import {FC, useEffect, useMemo, useRef} from "react";
import {Collapse} from "@ui/collapse/collapse"
import {PrettyDescription} from "./PrettyDescription";
import {MediaContextProvider} from "@context/MediaContextProvider";
import {useCollectionOne} from "@context/CollectionOneContext";
import type {MediaPlayerStore, VideoRecord} from "@shared/types/types";
import {useStore} from "@shared/hook/useStore";
import styles from "./styles.module.css";
import {VideoControls} from "./VideoControls";

interface VideoDetailProps {
    time: number
}

export const VideoDetail: FC<VideoDetailProps> = ({time = 0}) => {
    const {pb} = useAppContext();
    const {data: video} = useCollectionOne<VideoRecord>();
    const player = useRef<MediaPlayerInstance | null>(null);
    const {getStore, setStore} = useStore<MediaPlayerStore>();
    const videoPlayerStore = getStore('video_player');

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

    const savePlayerData = () => {
        setStore('video_player', prev => {
            prev.time = {
                ...prev.time,
                [video.id]: player.current?.currentTime || 0
            }
            prev.volume = player.current?.volume || 0.5;
            return prev;
        });
    }

    useEffect(() => {
        if (!track) return;

        player.current?.textTracks.add(track);
        return () => {
            player.current?.textTracks.remove(track);
        }
    }, [track]);


    useEffect(() => {
        window.addEventListener('beforeunload', savePlayerData);

        return () => {
            window.removeEventListener('beforeunload', savePlayerData);
            savePlayerData();
        }
    }, [track]);

    return (
        <Box>
            <MediaPlayer
                src={{
                    src: `${import.meta.env.VITE_PB_URL}/api/video/${video.id}/stream?token=${pb.authStore.token}`,
                    type: 'video/mp4'
                }}
                ref={player}
                currentTime={time > 0 ? time : videoPlayerStore.time?.[video.id]}
                volume={videoPlayerStore.volume}
                muted={!videoPlayerStore.volume}
                fullscreenOrientation="any"
                crossOrigin
                playsInline
                autoPlay
                load="eager"
                style={{
                    width: 'min(65vw, 187.5rem)',
                    aspectRatio: '16/9',
                    maxHeight: 'min(80vh, 87.5rem)',
                }}>
                <MediaProvider className={styles.mediaProvider}/>
                <DefaultVideoLayout
                    thumbnails={pb.files.getURL(video, video.webvtt)}
                    icons={defaultLayoutIcons}
                    slots={{
                        googleCastButton: null,
                    }}
                />
            </MediaPlayer>
            <MediaContextProvider player={player}>
                <Flex justify="space-between" alignItems="center">
                    <Heading size="xl" as="h1" py={2}>
                        {video.name}
                    </Heading>
                    <VideoControls/>
                </Flex>
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