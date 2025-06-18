import {useEffect, useState} from "react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {createEmptyFile} from "@shared/helpers/createEmptyFile";

const CHUNK_SIZE = 1024 * 1024;

export const useVideoUpload = () => {
    const {pb} = useAppContext();
    const [filePos, setFilePos] = useState<number>(0);
    const [wsConnect, setWsConnect] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [videoId, setVideoId] = useState<string>("");
    const [file, setFile] = useState<File>(createEmptyFile());

    const progress = file.size > 0 ? Math.round((filePos / file.size) * 100) : 0;
    const fileReader = new FileReader();

    const startUploading = (file: File) => {
        setFile(file);
        setUploading(true);
        setWsConnect(true);
    }

    const stopUploading = () => {
        setUploading(false);
        setWsConnect(false);
    }


    const {sendMessage, sendJsonMessage, lastMessage, readyState} = useWebSocket(
        `${import.meta.env.VITE_WEBSOCKET}/api/upload`,
        {
            shouldReconnect: () => true,
            reconnectAttempts: 10,
            reconnectInterval: 10000,
        },
        wsConnect,
    );

    useEffect(() => {
        switch (readyState) {
            case ReadyState.OPEN:
                sendJsonMessage({
                    size: file.size,
                    name: file.name,
                    token: pb.authStore.token,
                });
                break;
            case ReadyState.CLOSED:
                stopUploading();
                break;
        }
    }, [readyState]);

    useEffect(() => {
        if (!lastMessage) return;

        try {
            const res = JSON.parse(lastMessage?.data);
            switch (res.type) {
                case 'part':
                    nextChunk();
                    break;
                case 'end':
                    setSuccess(true);
                    setWsConnect(false);
                    break;
            }

            if (res.videoId) {
                setVideoId(res.videoId);
            }
        } catch (e) {
            console.error(e, lastMessage);
        }
    }, [lastMessage]);

    const nextChunk = () => {
        let end = filePos + CHUNK_SIZE;
        if (end > file.size) {
            end = file.size;
        }

        const blob = file.slice(filePos, end);
        setFilePos(filePos + blob.size);

        fileReader.readAsArrayBuffer(blob);
    }

    fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target?.readyState !== FileReader.DONE) return;
        if (!fileReader.result) return;
        sendMessage(fileReader.result);
    }

    return {
        uploading,
        stopUploading,
        startUploading,
        progress,
        success,
        videoId,
    };
}