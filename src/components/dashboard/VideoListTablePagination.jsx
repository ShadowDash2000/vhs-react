import {ButtonGroup, IconButton, Pagination} from "@chakra-ui/react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";

export const VideoListTablePagination = ({count, pageSize, page, onChange}) => {

    return (
        <Pagination.Root count={count} pageSize={pageSize} page={page}>
            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                <Pagination.PrevTrigger asChild>
                    <IconButton onClick={() => onChange(-1)}>
                        <LuChevronLeft/>
                    </IconButton>
                </Pagination.PrevTrigger>
                <Pagination.Items
                    render={(page) => (
                        <IconButton
                            variant={{base: "ghost", _selected: "outline"}}
                            onClick={() => setPage(page.value)}
                        >
                            {page.value}
                        </IconButton>
                    )}
                />
                <Pagination.NextTrigger asChild>
                    <IconButton onClick={() => onChange(1)}>
                        <LuChevronRight/>
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    )
}