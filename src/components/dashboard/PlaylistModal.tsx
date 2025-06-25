import {type FC, type ReactNode, useState} from "react";
import {CloseButton, Dialog, Portal} from "@chakra-ui/react";
import {PlaylistEditForm} from "./PlaylistEditForm";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {useQueryClient} from "@tanstack/react-query";
import {CollectionListAllProvider} from "@context/CollectionListAllContext";

interface PlaylistModalProps {
    title: string;
    children?: ReactNode;
}

export const PlaylistModal: FC<PlaylistModalProps> = ({title, children}) => {
    const {pb} = useAppContext();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState<boolean>(false);

    const onOpenChange = (open: boolean) => {
        setOpen(open);
        !open && queryClient.invalidateQueries({
            queryKey: ['playlists'],
        });
    }

    return (
        <Dialog.Root
            lazyMount
            open={open}
            onOpenChange={(e) => onOpenChange(e.open)}
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
                            <CollectionListAllProvider
                                collection={pb.collection('videos')}
                            >
                                <PlaylistEditForm onSuccess={() => onOpenChange(false)}/>
                            </CollectionListAllProvider>
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