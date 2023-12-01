import { App } from "./App";
import { VoteSetHeavy } from "../../../types";

type CellDirection = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

export class Cell {
    app: App;
    indexX: number;
    indexY: number;
    x: number;
    y: number;
    width: number;
    height: number;
    voteSets: VoteSetHeavy[];
    cellSize: number;

    constructor(
        app: App,
        indexX: number,
        indexY: number,
        x: number,
        y: number,
        width: number,
        height: number,
        cellSize: number
    ) {
        this.app = app;
        this.indexX = indexX;
        this.indexY = indexY;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.voteSets = [];
    }

    getNeighbour = (distanceIndex: number) => {
        const getShell = (distanceIndex: number) => {
            // todo
            return 0;
        };

        const getRibSizeForShell = (shell: number) => {
            return (shell + 1) * 2 + 1;
        };

        const getAreaInsideShell = (shell: number) => {
            const ribSizeInside = getRibSizeForShell(shell - 1);
            return ribSizeInside * ribSizeInside - 1;
        };

        const getCoordinatesForShell = (
            shell: number,
            distanceIndex: number
        ) => {
            let step = 0;
            const size = getRibSizeForShell(shell); // 3
            // we start north west inside the shell
            let x = -Math.floor(size / 2);
            let y = -Math.floor(size / 2); // -1, -1
            if (step === distanceIndex) {
                return { x, y };
            }
            // walking east
            for (let i = 1; i < size; i++) {
                x++;
                step++;
                if (step === distanceIndex) {
                    return { x, y };
                }
            }
            // walking south
            for (let i = 1; i < size; i++) {
                y++;
                step++;
                if (step === distanceIndex) {
                    return { x, y };
                }
            }
            // walking west
            for (let i = 1; i < size; i++) {
                x--;
                step++;
                if (step === distanceIndex) {
                    return { x, y };
                }
            }
            // walking north
            // skip the last step, because we are already at the start again
            for (let i = 1; i < size - 1; i++) {
                y--;
                step++;
                if (step === distanceIndex) {
                    return { x, y };
                }
            }

            return { x, y };
        };

        const shell = getShell(distanceIndex); // 0
        const areaInside = getAreaInsideShell(shell); // 0
        const distanceIndexInShell = distanceIndex - areaInside; // 0
        const coordinates = getCoordinatesForShell(shell, distanceIndexInShell); // [-1, -1]

        console.log(
            distanceIndex,
            shell,
            areaInside,
            distanceIndexInShell,
            coordinates
        );
        return this.app.getCellFromCoordinates(
            this.indexX + coordinates.x,
            this.indexY + coordinates.y
        );
    };

    addVoteSet = (voteSet: VoteSetHeavy) => {
        if (this.isEmpty() || this.voteSets[0].party === voteSet.party) {
            this.voteSets.push(voteSet);
        }
    };

    draw(ctx: CanvasRenderingContext2D) {
        if (this.voteSets.length > 0) {
            const voteSet = this.voteSets[0];
            if (voteSet.party) {
                ctx.fillStyle = voteSet.party.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.strokeStyle = "black";
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        } else {
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    getPopulation = () => {
        return this.voteSets.reduce((acc, voteSet) => {
            return acc + voteSet.votes;
        }, 0);
    };

    isEmpty = () => {
        return this.voteSets.length === 0;
    };

    // todo, maybe cache this
    // clear/reset on addVoteSet
    getSpace = () => {
        return this.cellSize - this.getPopulation();
    };

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
