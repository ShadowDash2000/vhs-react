import {Flex, Menu, Tabs} from "@chakra-ui/react";
import {MenuBox} from "@ui/menu/menu";
import {UploadModal} from "./UploadModal";
import {LuCloudUpload} from "react-icons/lu";
import {PlaylistModal} from "./PlaylistModal";
import {RiPlayListAddLine} from "react-icons/ri";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {CollectionListProvider} from "@context/CollectionListContext";

const DashboardHeader = () => {
    const {pb, user} = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Flex justify="space-between" pb={5}>
            <Tabs.Root
                defaultValue={location.pathname}
                value={location.pathname}
                onValueChange={(e) => navigate(e.value)}
            >
                <Tabs.List>
                    <Tabs.Trigger value="/dashboard">
                        Видео
                    </Tabs.Trigger>
                    <Tabs.Trigger value="/dashboard/playlists">
                        Плейлисты
                    </Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
            <MenuBox
                label="Создать"
                unmountOnExit={false}
            >
                <CollectionListProvider
                    collection={pb.collection('playlists')}
                    pageSize={10}
                    options={{
                        filter: `user = "${user?.id}"`,
                    }}
                >
                    <UploadModal>
                        <Menu.Item value="upload-video">
                            <Flex alignItems="center" gap={2}>
                                <LuCloudUpload/> Загрузить видео
                            </Flex>
                        </Menu.Item>
                    </UploadModal>
                </CollectionListProvider>
                <PlaylistModal title={"Создать плейлист"}>
                    <Menu.Item value="create-playlist">
                        <Flex alignItems="center" gap={2}>
                            <RiPlayListAddLine/> Создать плейлист
                        </Flex>
                    </Menu.Item>
                </PlaylistModal>
            </MenuBox>
        </Flex>
    );
}

export default DashboardHeader;