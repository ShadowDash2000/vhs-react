import {Portal, Tooltip as ChakraTooltip} from '@chakra-ui/react'
import type {FC, RefObject, ReactNode, Ref} from "react";

interface TooltipCProps extends ChakraTooltip.RootProps {
    content: ReactNode;
    showArrow?: boolean;
    children: ReactNode;
    disabled?: boolean;
    portalled?: boolean;
    contentProps?: ChakraTooltip.ContentProps;
    ref?: Ref<HTMLDivElement>;
    portalRef?: RefObject<HTMLElement>
}

export const Tooltip: FC<TooltipCProps> =
    ({showArrow, children, disabled, portalled = true, content, contentProps, ref, portalRef, ...props}) => {

        if (disabled) return children

        return (
            <ChakraTooltip.Root {...props}>
                <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
                <Portal disabled={!portalled} container={portalRef}>
                    <ChakraTooltip.Positioner>
                        <ChakraTooltip.Content ref={ref} {...contentProps}>
                            {showArrow && (
                                <ChakraTooltip.Arrow>
                                    <ChakraTooltip.ArrowTip/>
                                </ChakraTooltip.Arrow>
                            )}
                            {content}
                        </ChakraTooltip.Content>
                    </ChakraTooltip.Positioner>
                </Portal>
            </ChakraTooltip.Root>
        )
    }
