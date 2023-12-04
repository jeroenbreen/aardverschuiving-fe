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
    turn: number;

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
        this.turn = 0;
        this.voteSets = [];
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

        const shell = getShell(shellPosition); // 0
        const areaInside = getAreaInsideShell(shell); // 0
        const shellPositionInShell = shellPosition - areaInside; // 0
        const coordinates = getCoordinatesForShell(shell, shellPositionInShell); // [-1, -1]

        // console.log(
        //     shellPosition,
        //     shell,
        //     areaInside,
        //     shellPositionInShell,
        //     coordinates
        // );
        return this.app.getCellFromCoordinates(
            this.indexX + coordinates.x,
            this.indexY + coordinates.y
        );
    }

    getTotalDistance() {
        return this.voteSets.reduce((acc, voteSet) => {
            return acc + voteSet.distance * voteSet.votes;
        }, 0);
    }

    addVoteSet(voteSet: VoteSetHeavyWithDistance) {
        if (this.isEmpty() || this.voteSets[0].party === voteSet.party) {
            this.voteSets.push(voteSet);
        }
    }

    filledPercentage() {
        return (100 * this.getPopulation()) / this.cellPopulation;
    }

    draw(ctx: CanvasRenderingContext2D, selectedParties: number[]) {
        if (this.voteSets.length > 0 && this.doDraw()) {
            const voteSet = this.voteSets[0];
            if (voteSet.party) {
                if (selectedParties.includes(voteSet.party.id)) {
                    let size, x, y;
                    if (settings.notFullCells === "reduce") {
                        size = this.size * (this.filledPercentage() / 100);
                        x = this.x + settings.padding + (this.size - size) / 2;
                        y = this.y + settings.padding + (this.size - size) / 2;
                    } else {
                        size = this.size;
                        x = this.x + settings.padding;
                        y = this.y + settings.padding;
                    }
                    const party = this.getParty();
                    if (party) {
                        ctx.fillStyle = party.color;
                        ctx.fillRect(x, y, size, size);
                    }
                } else {
                    this.drawBlank(ctx);
                }
            }
        }
    }

    drawBlank(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(
            this.x + settings.padding,
            this.y + settings.padding,
            this.size,
            this.size
        );
    }

    doDraw() {
        if (settings.notFullCells === "reduce") {
            return true;
        } else {
            return this.filledPercentage() > 50;
        }
    }

    getPopulation() {
        return this.voteSets.reduce((acc, voteSet) => {
            return acc + voteSet.votes;
        }, 0);
    }

    isEmpty() {
        return this.voteSets.length === 0;
    }

    // todo, maybe cache this
    // clear/reset on addVoteSet
    getSpace() {
        return this.cellPopulation - this.getPopulation();
    }

    getParty() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.voteSets[0].party;
        }
    }

    matchesParty(party: Party) {
        if (this.isEmpty()) {
            return true;
        } else {
            return this.getParty() === party;
        }
    }

    log() {
        const voteSet = this.voteSets[0];
        if (voteSet) {
            if (voteSet.municipality && voteSet.party) {
                console.log(
                    voteSet.municipality.title + " " + voteSet.party.name
                );
            }
        }
    }
}
