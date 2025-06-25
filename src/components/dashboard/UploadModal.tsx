import {type FC, type ReactNode, useState} from "react";
import {Box, CloseButton, Dialog, Portal, Text} from "@chakra-ui/react";
import {useVideoUpload} from "./useVideoUpload";
import {VideoFileUpload} from "./VideoFileUpload";
import {VideoEditForm} from "./VideoEditForm";
import {DialogBox} from "@ui/dialog/dialog";
import {useQueryClient} from "@tanstack/react-query";
import {CollectionListAllProvider} from "@context/CollectionListAllContext";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";

interface UploadModalProps {
    children?: ReactNode;
}

export const UploadModal: FC<UploadModalProps> = ({children}) => {
    const {pb, user} = useAppContext();
    const queryClient = useQueryClient();
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

    const onOpenChange = (open: boolean) => {
        if (uploading) {
            setOpenCancelDialog(true);
        } else {
            setOpen(open);
            !open && queryClient.invalidateQueries({
                queryKey: ['videos'],
            });
        }
    }

    return (
        <>
            <Dialog.Root
                lazyMount
                open={open}
                onOpenChange={(e) => onOpenChange(e.open)}>
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
                                            <CollectionListAllProvider
                                                collection={pb.collection('playlists')}
                                                options={{
                                                    filter: `user = "${user?.id}"`,
                                                }}
                                            >
                                                <VideoEditForm
                                                    videoId={videoId}
                                                    onSuccess={() => {
                                                        setOpen(false);
                                                    }}
                                                />
                                            </CollectionListAllProvider>
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
                        onOpenChange(false);
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