import type {FC, ReactNode} from "react";
import {useMediaContext, type MediaContextProviderType} from "@context/MediaContextProvider";

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

const parsePrettyDescription = (str: string, mediaContext: MediaContextProviderType) => {
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
            <span
                key={match.index}
                onClick={() => {
                    mediaContext.ref.current?.remoteControl.seek(seconds)
                    console.log(seconds)
                }}
            >
                {match[0]}
            </span>
        );

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < str.length) {
        result.push(str.slice(lastIndex));
    }

    return result;
};

export const PrettyDescription: FC<PrettyDescriptionProps> = ({str}) => {
    const mediaContext = useMediaContext();
    const nodes = parsePrettyDescription(str, mediaContext);

    return <span>{nodes}</span>;
};