import {Box, FileUpload, Icon, useFileUpload} from "@chakra-ui/react";
import {LuUpload} from "react-icons/lu";
import type {FC} from "react";

interface VideoFileUploadProps {
    onFileSet: (file: File) => void
}

export const VideoFileUpload: FC<VideoFileUploadProps> = ({onFileSet}) => {
    const fileUpload = useFileUpload({
        maxFiles: 1,
        accept: ['video/mp4'],
        onFileAccept: (details) => {
            onFileSet(details.files[0]);
        },
    });

    return (
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
    )
}