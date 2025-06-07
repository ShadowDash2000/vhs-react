import {
    Box,
    HStack,
    IconButton,
    Input,
    InputGroup,
    Stack,
    mergeRefs,
    useControllableState
} from '@chakra-ui/react'
import {useRef} from 'react';
import {LuEye, LuEyeOff} from 'react-icons/lu';
import type {FC} from "react"
import type {
    PasswordInputProps,
    VisibilityTriggerProps,
    PasswordStrengthMeterProps
} from "./types";

export const PasswordInput: FC<PasswordInputProps> =
    ({
         rootProps,
         defaultVisible,
         visible: visibleProp,
         onVisibleChange,
         ref,
         visibilityIcon = {on: <LuEye/>, off: <LuEyeOff/>},
         disabled,
         ...props
     }) => {

        const [visible, setVisible] = useControllableState({
            value: visibleProp,
            defaultValue: defaultVisible || false,
            onChange: onVisibleChange,
        });

        const inputRef = useRef<HTMLInputElement | null>(null);

        return (
            <InputGroup
                endElement={
                    <VisibilityTrigger
                        disabled={disabled}
                        onPointerDown={(e) => {
                            if (disabled) return
                            if (e.button !== 0) return
                            e.preventDefault()
                            setVisible(!visible)
                        }}
                    >
                        {visible ? visibilityIcon.off : visibilityIcon.on}
                    </VisibilityTrigger>
                }
                {...rootProps}
            >
                <Input
                    {...props}
                    ref={mergeRefs(ref, inputRef)}
                    type={visible ? 'text' : 'password'}
                />
            </InputGroup>
        )
    }

const VisibilityTrigger: FC<VisibilityTriggerProps> = (props) => {
    return (
        <IconButton
            tabIndex={-1}
            ref={props.ref}
            me='-2'
            aspectRatio='square'
            size='sm'
            variant='ghost'
            height='calc(100% - {spacing.2})'
            aria-label='Toggle password visibility'
            {...props}
        />
    )
}

export const PasswordStrengthMeter: FC<PasswordStrengthMeterProps> =
    ({max = 4, value, ...props}) => {

    const percent = (value / max) * 100
    const {label, colorPalette} = getColorPalette(percent)

    return (
        <Stack align='flex-end' gap='1' ref={props.ref} {...props}>
            <HStack width='full' ref={props.ref} {...props}>
                {Array.from({length: max}).map((_, index) => (
                    <Box
                        key={index}
                        height='1'
                        flex='1'
                        rounded='sm'
                        data-selected={index < value ? '' : undefined}
                        layerStyle='fill.subtle'
                        colorPalette='gray'
                        _selected={{
                            colorPalette,
                            layerStyle: 'fill.solid',
                        }}
                    />
                ))}
            </HStack>
            {label && <HStack textStyle='xs'>{label}</HStack>}
        </Stack>
    )
}

function getColorPalette(percent: number) {
    switch (true) {
        case percent < 33:
            return {label: 'Low', colorPalette: 'red'}
        case percent < 66:
            return {label: 'Medium', colorPalette: 'orange'}
        default:
            return {label: 'High', colorPalette: 'green'}
    }
}
