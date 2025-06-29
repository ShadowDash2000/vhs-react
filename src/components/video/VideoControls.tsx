import {Menu, Portal} from "@chakra-ui/react";
import {LuShare} from "react-icons/lu";
import {useMediaContext} from "@context/MediaContextProvider";

export const VideoControls = () => {
    const {player} = useMediaContext();
    const {origin, pathname} = window.location;
    const url = origin + pathname;

    const copyUrl = async (withTime = false) => {
        await navigator.clipboard.writeText(
            withTime
                ? `${url}?t=${Math.trunc(player.current?.currentTime || 0)}`
                : url
        );
    }

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <LuShare/>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="copy-link" onClick={() => copyUrl()}>
                            Копировать URL
                        </Menu.Item>
                        <Menu.Item value="copy-link-with-time" onClick={() => copyUrl(true)}>
                            Копировать URL с привязкой времени
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}