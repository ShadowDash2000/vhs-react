import type {Ref, ReactNode} from "react";
import type {BoxProps, IconButtonProps, InputProps, StackProps} from "@chakra-ui/react"

export interface PasswordInputProps extends InputProps {
    ref?: Ref<HTMLInputElement>
    rootProps?: BoxProps
    defaultVisible?: boolean
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void;
    visibilityIcon?: {
        on: ReactNode;
        off: ReactNode;
    };
}

export interface VisibilityTriggerProps extends IconButtonProps{
    ref?: Ref<HTMLButtonElement>
}

export interface PasswordStrengthMeterProps extends StackProps {
    max: number
    value: number
    colorPalette?: string
    label?: ReactNode
    rootProps?: StackProps
    barsProps?: BoxProps
    ref?: Ref<HTMLDivElement>
}