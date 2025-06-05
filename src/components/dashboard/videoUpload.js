import {useEffect, useState} from "react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useAppContext} from "../../context/AppContextProvider.jsx";

const CHUNK_SIZE = 1024 * 1024;

export const useVideoUpload = (file = null) => {
    const {pb} = useAppContext();
    const [filePos, setFilePos] = useState(0);
    const [wsConnect, setWsConnect] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [videoId, setVideoId] = useState("");

    const progress = !!file ? Math.round((filePos / file.size) * 100) : 0;
    const fileReader = new FileReader();

    useEffect(() => {
        setWsConnect(!!file);
        setUploading(!!file);
    }, [file]);

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

                break;
        }
    }, [readyState]);

    useEffect(() => {
        try {
            const res = JSON.parse(lastMessage.data);
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

    fileReader.onloadend = (e) => {
        if (e.target.readyState !== FileReader.DONE) return;

        sendMessage(fileReader.result);
    }

    return {
        uploading,
        progress,
        success,
        videoId,
    };
}