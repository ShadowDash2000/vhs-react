import {type FC, type ReactNode} from "react";
import {CloseButton, Dialog, Portal} from "@chakra-ui/react";
import {PlaylistEditForm} from "./PlaylistEditForm";

interface PlaylistModalProps {
    title: string;
    children?: ReactNode;
}

export const PlaylistModal: FC<PlaylistModalProps> = ({title, children}) => {
    return (
        <>
            <Dialog.Root lazyMount>
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
                                <PlaylistEditForm/>
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm"/>
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}