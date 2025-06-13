import {Button, CloseButton, Dialog, Portal} from "@chakra-ui/react"
import {type ReactNode, useState} from "react";

interface DialogBoxProps {
    title?: string;
    body?: ReactNode;
    footer?: ReactNode;
    trigger?: ReactNode;
    onCancel?: () => void;
    onSubmit?: () => void;
    isOpen?: boolean;
}

export const DialogBox = (
    {
        title,
        body,
        trigger,
        onCancel,
        onSubmit,
        isOpen,
    }: DialogBoxProps) => {
    const [open, setOpen] = useState<boolean>(isOpen || false);

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(e) => {
                if (!e.open) {
                    setOpen(false);
                    onCancel && onCancel();
                }
            }}
            role="alertdialog"
        >
            {
                trigger &&
                <Dialog.Trigger asChild>
                    {trigger}
                </Dialog.Trigger>
            }
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {body}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                onClick={() => {
                                    onSubmit && onSubmit();
                                    setOpen(false);
                                }}
                            >Save</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}