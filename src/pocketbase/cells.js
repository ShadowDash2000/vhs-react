import {useAppContext} from "../context/AppContextProvider.jsx";
import {useSuspenseQuery} from "@tanstack/react-query";

const collectionName = 'cells';

export const useCells = () => {
    const {pb} = useAppContext();

    return useSuspenseQuery({
        queryKey: ['cells'],
        queryFn: async () => {
            const cells = await pb.collection(collectionName).getFullList({
                filter: 'isActive = true',
            });

            const cellsMap = new Map();
            cells.forEach((cell) => cellsMap.set(cell.id, cell));
            return cellsMap;
        },
    });
}

export const useCellsBoard = () => {
    const {data: cells, ...rest} = useCells();

    const lineElements = cells.size > 7 ? 7 : cells.size;
    const result = [];
    let line = 0;
    let currentLine = [];
    let elementIndex = 1;

    for (const cell of cells.values()) {
        currentLine[elementIndex] = cell;

        if (elementIndex % lineElements === 0) {
            if (line % 2 === 1) currentLine.reverse();

            result.push(currentLine);
            currentLine = [];
            line++;
        }

        elementIndex++;
    }

    return {cells: result.reverse(), ...rest};
}
