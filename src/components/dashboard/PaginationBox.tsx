import {ButtonGroup, IconButton, Pagination} from "@chakra-ui/react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import type {FC} from "react";
import {useSearchParams} from "react-router-dom";

interface PaginationBoxProps {
    count: number
    pageSize: number
    page: number
}

export const PaginationBox: FC<PaginationBoxProps> = (
    {
        count,
        pageSize,
        page,
    }
) => {
    const [, setSearchParams] = useSearchParams();

    const setPage = (page: number) => {
        setSearchParams((prev) => {
            prev.set('page', page.toString());
            return prev;
        });
    }

    return (
        <Pagination.Root count={count} pageSize={pageSize} page={page}>
            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                <Pagination.PrevTrigger asChild>
                    <IconButton onClick={() => setPage(page - 1)}>
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
                    <IconButton onClick={() => setPage(page + 1)}>
                        <LuChevronRight/>
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    )
}