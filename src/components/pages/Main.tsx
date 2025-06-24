import {VideoList} from "../video/VideoList";
import {CollectionListInfiniteProvider} from "@context/CollectionListInfiniteContext";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {Sort} from "@shared/hook/useSort";

const Main = () => {
    const {pb} = useAppContext();

    return (
        <CollectionListInfiniteProvider
            collection={pb.collection('videos')}
            pageSize={24}
            initialSort={new Map([['created', Sort.DESC]])}
        >
            <VideoList/>
        </CollectionListInfiniteProvider>
    )
}

export default Main;