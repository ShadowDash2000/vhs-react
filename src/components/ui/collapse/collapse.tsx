import type { CollapseProps } from "./types"
import {type FC, useState} from "react";
import styles from "./styles.module.css"
import {Box, Button, Text} from "@chakra-ui/react";


export const Collapse: FC<CollapseProps> = ({children, defaultCountLines = 3, ...props}) => {
    const [open, setOpen] = useState<boolean>(false);
    const DEFAULT_VALUE = 'none' as const;
    return (
        <Box
            className={styles.details}
            {...props}
        >
            <Text
                onClick={() => setOpen(true)}
                WebkitLineClamp={open ? DEFAULT_VALUE : defaultCountLines}
                className={styles.detailsContent}>
                {children}
                {open ? (
                    <Button
                        display="block"
                        marginRight="auto"
                        variant='subtle'
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                        }}
                    >
                        Свернуть
                    </Button>
                ) : null}
            </Text>
        </Box>
    )
}
