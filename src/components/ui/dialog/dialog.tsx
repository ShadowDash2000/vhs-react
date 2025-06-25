import {Button, CloseButton, Dialog, Portal} from "@chakra-ui/react"
import {type ReactNode, useState} from "react";

interface DialogBoxProps {
    title?: string;
    body?: ReactNode;
    footer?: ReactNode;
    onCancel?: () => void;
    onSubmit?: () => void;
    isOpen?: boolean;
    children?: ReactNode;
}

export const DialogBox = (
    {
        title,
        body,
        onCancel,
        onSubmit,
        isOpen,
        children,
    }: DialogBoxProps) => {
    const [open, setOpen] = useState<boolean | undefined>(isOpen || undefined);

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(e) => {
                if (!e.open) {
                    !children && setOpen(false);
                    onCancel && onCancel();
                }
            }}
            role="alertdialog"
        >
            {
                children &&
                <Dialog.Trigger asChild>
                    {children}
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