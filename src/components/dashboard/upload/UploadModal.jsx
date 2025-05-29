import {useState} from "react";
import {Box, Button, CloseButton, Dialog, Portal} from "@chakra-ui/react";
import {useVideoUpload} from "./videoUpload.js";
import {VideoFileUpload} from "./VideoFileUpload.jsx";
import {VideoEditForm} from "./VideoEditForm.jsx";

export const UploadModal = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const {uploading, progress, success, videoId} = useVideoUpload(file);

    const onFileSet = (file) => {
        setFile(file);
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
                                uploading ?
                                    <Box>
                                        <VideoEditForm
                                            videoId={videoId}
                                            onSuccess={() => {
                                                setOpen(false);
                                            }}
                                        />
                                        <p>
                                            {
                                                success
                                                    ? 'Загрузка завершена'
                                                    : `${progress}%`
                                            }
                                        </p>
                                    </Box> :
                                    <VideoFileUpload onFileSet={onFileSet}/>
                            }
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