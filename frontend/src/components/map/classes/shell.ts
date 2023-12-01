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
