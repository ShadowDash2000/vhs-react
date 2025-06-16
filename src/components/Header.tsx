import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {Box, Tabs} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {LuHouse} from "react-icons/lu";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {RiPlayList2Line} from "react-icons/ri";

export const Header = () => {
    const {isAuth} = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Box
            py={4}
            px={28}
            display="flex"
            justifyContent="justify-between"
            alignItems="items-end"
        >
            <Tabs.Root
                defaultValue={location.pathname}
                value={location.pathname}
                onValueChange={(e) => navigate(e.value)}
            >
                <Tabs.List>
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
        </Box>
    )
}