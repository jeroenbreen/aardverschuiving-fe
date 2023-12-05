import { App } from "./App";
import { Party, VoteSetHeavyWithDistance } from "../../../types";
import { getShell, getRibSizeForShell, getAreaInsideShell } from "./shell";
import { settings } from "./settings";

export class Cell {
    app: App;
    indexX: number;
    indexY: number;
    x: number;
    y: number;
    size: number;
    voteSets: VoteSetHeavyWithDistance[];
    cellPopulation: number;
    population: number;
    cache: any;

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
            const voteSet = this.voteSets[0];
            if (
                voteSet[2] &&
                voteSet[2].id &&
                selectedParties.includes(voteSet[2].id)
            ) {
                const size = this.size * (this.filledPercentage() / 100);
                const x = this.x + settings.padding + (this.size - size) / 2;
                const y = this.y + settings.padding + (this.size - size) / 2;
                const party = this.getParty();
                if (party) {
                    ctx.fillStyle = party.color;
                    ctx.fillRect(x, y, size, size);
                }
            }
        }
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
