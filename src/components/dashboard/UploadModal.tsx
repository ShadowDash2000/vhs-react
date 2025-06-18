import {type FC, type ReactNode, useState} from "react";
import {Box, CloseButton, Dialog, Portal, Text} from "@chakra-ui/react";
import {useVideoUpload} from "./useVideoUpload";
import {VideoFileUpload} from "./VideoFileUpload";
import {VideoEditForm} from "./VideoEditForm";
import {DialogBox} from "@ui/dialog/dialog";

interface UploadModalProps {
    children?: ReactNode;
}

export const UploadModal: FC<UploadModalProps> = ({children}) => {
    const [open, setOpen] = useState<boolean>(false);
    const {
        uploading,
        progress,
        success,
        videoId,
        startUploading,
        stopUploading,
    } = useVideoUpload();
    const [openCancelDialog, setOpenCancelDialog] = useState<boolean>(false);

    return (
        <>
            <Dialog.Root
                lazyMount
                open={open}
                onOpenChange={(e) => {
                    if (uploading) {
                        setOpenCancelDialog(true);
                    } else {
                        setOpen(e.open);
                    }
                }}>
                <Dialog.Trigger asChild>
                    {children}
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
                                    uploading || success ?
                                        <Box>
                                            <VideoEditForm
                                                videoId={videoId}
                                                onSuccess={() => {
                                                    setOpen(false);
                                                }}
                                            />
                                            <Text>
                                                {
                                                    success
                                                        ? 'Загрузка завершена'
                                                        : `${progress}%`
                                                }
                                            </Text>
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
            {
                openCancelDialog &&
                <DialogBox
                    title="Отменить загрузку?"
                    body="Видео все еще загружается."
                    onSubmit={() => {
                        stopUploading();
                        setOpen(false);
                    }}
                    onCancel={() => {
                        setOpenCancelDialog(false);
                    }}
                    isOpen={true}
                />
            }
        </>
    )
}