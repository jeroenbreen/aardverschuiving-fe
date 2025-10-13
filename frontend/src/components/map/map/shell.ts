import { Cell } from "./Cell";

export const getShell = (distanceIndex: number) => {
    let shell = 0;
    let areaInside = getAreaInsideShell(shell + 1);
    while (areaInside < distanceIndex) {
        shell++;
        areaInside = getAreaInsideShell(shell + 1);
    }
    return shell;
};

export const getRibSizeForShell = (shell: number) => {
    return (shell + 1) * 2 + 1;
};

export const getAreaInsideShell = (shell: number) => {
    const ribSizeInside = getRibSizeForShell(shell - 1);
    return ribSizeInside * ribSizeInside - 1;
};

export const getDistanceBetweenCells = (cell1: Cell, cell2: Cell) => {
    const a = Math.round(cell1.indexX - cell2.indexX);
    const b = Math.round(cell1.indexY - cell2.indexY);
    return Math.sqrt(a * a + b * b);
};
