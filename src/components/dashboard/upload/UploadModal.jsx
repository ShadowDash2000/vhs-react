import {useEffect, useState} from "react";
import {Box, Button, CloseButton, Dialog, FileUpload, Icon, Portal, useFileUpload} from "@chakra-ui/react";
import {LuUpload} from "react-icons/lu";
import useWebSocket, {ReadyState} from "react-use-websocket";

const CHUNK_SIZE = 1024 * 1024;

export const UploadModal = () => {
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [filePos, setFilePos] = useState(0);

    const fileReader = new FileReader();

    const fileUpload = useFileUpload({
        maxFiles: 1,
        accept: ['video/mp4'],
        onFileAccept: (details) => {
            setFile(details.files[0]);
        },
    });

    const {sendMessage, sendJsonMessage, lastMessage, readyState} = useWebSocket(
        `${import.meta.env.VITE_WEBSOCKET}/api/upload`,
        {
            shouldReconnect: () => true,
            reconnectAttempts: 10,
            reconnectInterval: 10000,
        },
    );

    useEffect(() => {
        switch (readyState) {
            case ReadyState.OPEN:
                sendJsonMessage('open');
                break;
            case ReadyState.CLOSED:

                break;
        }
    }, [readyState]);

    useEffect(() => {

    }, [lastMessage]);

    const nextChunk = () => {
        let end = filePos + CHUNK_SIZE;
        if (end > file.size) {
            end = file.size;
        }

        const blob = file.slice(filePos, end);
        fileReader.readAsArrayBuffer(blob);

        setFilePos(filePos + blob.size);
    }

    fileReader.onloadend = (e) => {
        if (e.target.readyState !== FileReader.DONE) return;

        nextChunk();
        sendMessage(fileReader.result);
    }

    return (
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => {
            setOpen(e.open)
        }}>
            <Dialog.Trigger asChild>
                <Button colorPalette={'blue'} rounded={'lg'}>Upload</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop></Dialog.Backdrop>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Upload</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {
                                uploading ? <Box>Uploading...</Box> :
                                    <FileUpload.RootProvider maxW="xl" alignItems="stretch" value={fileUpload}>
                                        <FileUpload.HiddenInput/>
                                        <FileUpload.Dropzone>
                                            <Icon size="md" color="fg.muted">
                                                <LuUpload/>
                                            </Icon>
                                            <FileUpload.DropzoneContent>
                                                <Box>Drag and drop files here</Box>
                                                <Box color="fg.muted">.mp4</Box>
                                            </FileUpload.DropzoneContent>
                                        </FileUpload.Dropzone>
                                        <FileUpload.List/>
                                    </FileUpload.RootProvider>
                            }
                            <p>{
                                file ?
                                    filePos % file.size
                                    : null
                            }</p>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}