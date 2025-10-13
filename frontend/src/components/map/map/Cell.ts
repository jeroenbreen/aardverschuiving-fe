import { App } from "./App";
import { Party, VoteSetHeavyWithDistance } from "../../../types";
import { getShell, getRibSizeForShell, getAreaInsideShell } from "./shell";

export class Cell {
    app: App;
    indexX: number;
    indexY: number;
    x: number;
    y: number;
    final: {
        size: number;
        map: {
            x: number;
            y: number;
        };
        legend: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    };
    size: number;
    voteSets: VoteSetHeavyWithDistance[];
    cellPopulation: number;
    population: number;
    cache: any;
    color: string;

    constructor(
        app: App,
        indexX: number,
        indexY: number,
        x: number,
        y: number,
        size: number,
        cellPopulation: number
    ) {
        this.app = app;
        this.indexX = indexX;
        this.indexY = indexY;
        this.x = x;
        this.y = y;
        this.size = size;
        this.cellPopulation = cellPopulation;
        this.population = 0;
        this.voteSets = [];
        this.cache = {
            neighbour: {},
        };
        this.final = {
            size: 0,
            map: {
                x: 0,
                y: 0,
            },
            legend: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
        };
        this.color = "grey";
    }

    getNeighbour(shellPosition: number) {
        const getCoordinatesForShell = (
            shell: number,
            shellPosition: number
        ) => {
            let step = 0;
            const size = getRibSizeForShell(shell); // 3
            // we start north west inside the shell
            let x = -Math.floor(size / 2);
            let y = -Math.floor(size / 2); // -1, -1
            if (step === shellPosition) {
                return { x, y };
            }
            // walking east
            for (let i = 1; i < size; i++) {
                x++;
                step++;
                if (step === shellPosition) {
                    return { x, y };
                }
            }
            // walking south
            for (let i = 1; i < size; i++) {
                y++;
                step++;
                if (step === shellPosition) {
                    return { x, y };
                }
            }
            // walking west
            for (let i = 1; i < size; i++) {
                x--;
                step++;
                if (step === shellPosition) {
                    return { x, y };
                }
            }
            // walking north
            // skip the last step, because we are already at the start again
            for (let i = 1; i < size - 1; i++) {
                y--;
                step++;
                if (step === shellPosition) {
                    return { x, y };
                }
            }

            return { x, y };
        };

        if (this.cache.neighbour[shellPosition]) {
            return this.cache.neighbour[shellPosition];
        } else {
            const shell = getShell(shellPosition); // 0
            const areaInside = getAreaInsideShell(shell); // 0
            const shellPositionInShell = shellPosition - areaInside; // 0
            const coordinates = getCoordinatesForShell(
                shell,
                shellPositionInShell
            ); // [-1, -1]
            const cell = this.app.getCellFromCoordinates(
                this.indexX + coordinates.x,
                this.indexY + coordinates.y
            );
            this.cache.neighbour[shellPosition] = cell;
            return cell;
        }
    }

    getTotalDistance() {
        return this.voteSets.reduce((acc, voteSet) => {
            return acc + voteSet[4] * voteSet[3];
        }, 0);
    }

    addVoteSet(voteSet: VoteSetHeavyWithDistance) {
        if (this.isEmpty() || this.voteSets[0][2] === voteSet[2]) {
            this.voteSets.push(voteSet);
            this.population += voteSet[3];
        }
    }

    filledPercentage() {
        return (100 * this.population) / this.cellPopulation;
    }

    draw(ctx: CanvasRenderingContext2D, selectedParties: number[]) {
        if (this.voteSets.length > 0) {
            if (this.show(selectedParties)) {
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    this.final.map.x,
                    this.final.map.y,
                    this.final.size,
                    this.final.size
                );
            }
        }
    }

    draw2(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.final.legend.x,
            this.final.legend.y,
            this.final.legend.width,
            this.final.legend.height
        );
    }

    switch(mapMode: boolean, part: number, ctx: CanvasRenderingContext2D) {
        let startX,
            startY,
            endX,
            endY,
            startWidth,
            endWidth,
            startHeight,
            endHeight;
        if (mapMode) {
            startX = this.final.legend.x;
            startY = this.final.legend.y;
            endX = this.final.map.x;
            endY = this.final.map.y;
            startWidth = this.final.legend.width;
            endWidth = this.final.size;
            startHeight = this.final.legend.height;
            endHeight = this.final.size;
        } else {
            startX = this.final.map.x;
            startY = this.final.map.y;
            endX = this.final.legend.x;
            endY = this.final.legend.y;
            startWidth = this.final.size;
            endWidth = this.final.legend.width;
            startHeight = this.final.size;
            endHeight = this.final.legend.height;
        }
        const x = startX + (endX - startX) * part;
        const y = startY + (endY - startY) * part;
        const width = startWidth + (endWidth - startWidth) * part;
        const height = startHeight + (endHeight - startHeight) * part;

        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, width, height);
    }

    finish() {
        const share = this.filledPercentage() / 100;
        const size = this.size * Math.sqrt(share);
        const marginLeft = this.app.width / 10;
        this.final.map.x = this.x + marginLeft + (this.size - size) / 2;
        this.final.map.y = this.y + marginLeft + (this.size - size) / 2;
        this.final.size = size;
        const party = this.getParty();
        if (party) {
            this.color = party.color;
        }
    }

    show(selectedParties: number[]) {
        const voteSet = this.voteSets[0];
        return voteSet && voteSet[2] && selectedParties.includes(voteSet[2].id);
    }

    isEmpty() {
        return this.voteSets.length === 0;
    }

    getSpace() {
        return this.cellPopulation - this.population;
    }

    getParty() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.voteSets[0][2];
        }
    }

    matchesParty(party: Party) {
        if (this.isEmpty()) {
            return true;
        } else {
            return this.getParty() === party;
        }
    }
}
