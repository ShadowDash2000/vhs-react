import type {BoxProps} from "@chakra-ui/react";
import type {ReactNode} from "react";

export interface CollapseProps extends BoxProps{
    children: ReactNode
    defaultCountLines?: number
}