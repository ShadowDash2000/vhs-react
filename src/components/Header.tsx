import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {Avatar, Flex, Tabs} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {LuHouse} from "react-icons/lu";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {RiPlayList2Line} from "react-icons/ri";

export const Header = () => {
    const {pb, user, isAuth} = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();

    const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

    const pickPalette = (name: string) => {
        const index = name.charCodeAt(0) % colorPalette.length;
        return colorPalette[index];
    }

    return (
        <Flex
            py={4}
            px={[undefined, undefined, undefined, 28]}
            justify={[undefined, undefined, undefined, "space-between"]}
            direction={["column", undefined, undefined, "row"]}
            alignItems={["center", undefined, undefined, "flex-end"]}
            gap={[2, undefined, undefined, undefined]}
        >
            <Tabs.Root
                defaultValue={location.pathname}
                value={location.pathname}
                onValueChange={(e) => navigate(e.value)}
            >
                <Tabs.List
                    display="flex"
                    flexDirection={["column", undefined, undefined, "row"]}
                    alignItems="center"
                >
                    <Tabs.Trigger value="/">
                        Главная <LuHouse/>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="/playlists">
                        Плейлисты <RiPlayList2Line/>
                    </Tabs.Trigger>
                    {
                        isAuth ?
                            <Tabs.Trigger value="/dashboard">
                                Dashboard <MdOutlineSpaceDashboard/>
                            </Tabs.Trigger> : null
                    }
                </Tabs.List>
            </Tabs.Root>
            {
                isAuth && user ?
                    <Avatar.Root colorPalette={pickPalette(user.name)}>
                        <Avatar.Fallback name={user.name}/>
                        <Avatar.Image src={pb.files.getURL(user, user.avatar || '')}/>
                    </Avatar.Root> : null
            }
        </Flex>
    )
}