import {ClientOnly, IconButton, Skeleton, Span} from '@chakra-ui/react';
import type {SpanProps, IconButtonProps } from "@chakra-ui/react";
import {ThemeProvider, useTheme} from 'next-themes';
import {LuMoon, LuSun} from 'react-icons/lu';
import type {FC, Ref} from "react";

interface ColorModeProviderProps {}

interface ColorModeButtonProps extends IconButtonProps{
    ref?: Ref<HTMLButtonElement>
}

interface SpanModeProps extends SpanProps{
    ref?: Ref<HTMLElement>
}

export const ColorModeProvider: FC<ColorModeProviderProps> = (props) => {
    return <ThemeProvider
            attribute='class'
            disableTransitionOnChange
            {...props}
    />
}

export function useColorMode() {
    const {resolvedTheme, setTheme} = useTheme();
    const toggleColorMode = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }
    return {
        colorMode: resolvedTheme,
        setColorMode: setTheme,
        toggleColorMode,
    }
}

export function useColorModeValue(light: string, dark: string) {
    const {colorMode} = useColorMode();
    return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
    const {colorMode} = useColorMode()
    return colorMode === 'dark' ? <LuMoon/> : <LuSun/>
}

export const ColorModeButton: FC<ColorModeButtonProps> = (props) => {
        const {toggleColorMode} = useColorMode()
        return (
            <ClientOnly fallback={<Skeleton boxSize='8'/>}>
                <IconButton
                    onClick={toggleColorMode}
                    variant='ghost'
                    aria-label='Toggle color mode'
                    size='sm'
                    ref={props.ref}
                    {...props}
                    css={{
                        _icon: {
                            width: '5',
                            height: '5',
                        },
                    }}
                >
                    <ColorModeIcon/>
                </IconButton>
            </ClientOnly>
        )
}

export const LightMode: FC<SpanModeProps> = (props) => {
    return (
        <Span
            color='fg'
            display='contents'
            className='chakra-theme light'
            colorPalette='gray'
            colorScheme='light'
            ref={props.ref}
            {...props}
        />
    )
}

export const DarkMode: FC<SpanModeProps> = (props) => {
    return (
        <Span
            color='fg'
            display='contents'
            className='chakra-theme dark'
            colorPalette='gray'
            colorScheme='dark'
            ref={props.ref}
            {...props}
        />
    )
}
