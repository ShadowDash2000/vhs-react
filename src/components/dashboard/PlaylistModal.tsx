import {type FC, type ReactNode, useState} from "react";
import {CloseButton, Dialog, Portal} from "@chakra-ui/react";
import {PlaylistEditForm} from "./PlaylistEditForm";
import {VideosListProvider} from "@context/VideosListContext";

interface PlaylistModalProps {
    title: string;
    children?: ReactNode;
}

export const PlaylistModal: FC<PlaylistModalProps> = ({title, children}) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog.Root
            lazyMount
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
        >
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop></Dialog.Backdrop>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VideosListProvider pageSize={10}>
                                <PlaylistEditForm onSuccess={() => setOpen(false)}/>
                            </VideosListProvider>
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