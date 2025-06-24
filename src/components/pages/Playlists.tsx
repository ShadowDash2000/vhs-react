import {PlaylistsList} from "../playlists/PlaylistsList";
import {Sort} from "@shared/hook/useSort";
import {CollectionListInfiniteProvider} from "@context/CollectionListInfiniteContext";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";

const Playlists = () => {
    const {pb} = useAppContext();

    return (
        <CollectionListInfiniteProvider
            collection={pb.collection('playlists')}
            pageSize={24}
            initialSort={new Map([['created', Sort.DESC]])}
        >
            <PlaylistsList/>
        </CollectionListInfiniteProvider>
    )
}

export default Playlists;