import {type FC, useState} from "react";
import {Box, Button, CloseButton, Dialog, Portal} from "@chakra-ui/react";
import {useVideoUpload} from "./videoUpload";
import {VideoFileUpload} from "./VideoFileUpload";
import {VideoEditForm} from "./VideoEditForm";

interface UploadModalProps {
}

export const UploadModal: FC<UploadModalProps> = () => {
    const [open, setOpen] = useState<boolean>(false);
    const {uploading, progress, success, videoId, startUploading} = useVideoUpload();

    return (
        <Dialog.Root
            lazyMount
            open={open}
            onOpenChange={(e) => {
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
                                    <VideoFileUpload onFileSet={(file) => startUploading(file)}/>
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