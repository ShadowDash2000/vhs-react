import type {FC, ReactNode, RefObject} from "react";
import {useMediaContext} from "@context/MediaContextProvider";
import type {MediaPlayerInstance} from "@vidstack/react";
import {Box, Tag} from "@chakra-ui/react";

interface PrettyDescriptionProps {
    str: string;
}

const timeToSeconds = (groups: Record<string, string>) => {
    let seconds = 0;
    if (groups.Hours) seconds += parseInt(groups.Hours) * 3600;
    if (groups.Minutes) seconds += parseInt(groups.Minutes) * 60;
    if (groups.Seconds) seconds += parseInt(groups.Seconds);

    return seconds;
};

const parsePrettyDescription = (str: string, player: RefObject<MediaPlayerInstance | null>) => {
    const regexp = /(?:(?<Hours>\d{2}):)?(?<Minutes>\d{2}):(?<Seconds>\d{2})/g;
    const result: ReactNode[] = [];

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regexp.exec(str)) !== null) {
        if (match.index > lastIndex) {
            result.push(str.slice(lastIndex, match.index));
        }

        const {groups} = match;
        const seconds = timeToSeconds(groups as Record<string, string>);

        result.push(
            <Tag.Root
                size="lg"
                colorPalette="gray"
                key={match.index}
                onClick={() => {
                    player.current?.remoteControl.seek(seconds)
                }}
                cursor="pointer"
                as="span"
            >
                <Tag.Label>{match[0]}</Tag.Label>
            </Tag.Root>
        );

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < str.length) {
        result.push(str.slice(lastIndex));
    }

    return result;
};

export const PrettyDescription: FC<PrettyDescriptionProps> = ({str}) => {
    const {player} = useMediaContext();
    const nodes = parsePrettyDescription(str, player);

    return <span>{nodes}</span>;
};