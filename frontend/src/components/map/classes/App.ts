import { VoteSetHeavy } from "../../../types";
import { Cell } from "./Cell";
import { settings } from "./settings";

const boundingBox = {
    x1: 3.31497114423,
    x2: 7.09205325687,
    y1: 53.5104033474,
    y2: 50.803721015,
};

// todo cache coordinates for each municipality

export class App {
    ctx: CanvasRenderingContext2D;
    voteSets: VoteSetHeavy[];
    cells: Cell[];
    totalPopulation: number;
    cellSize: number;
    grid: number;
    // chunks: VoteSetHeavy[];

    constructor(ctx: CanvasRenderingContext2D, voteSets: VoteSetHeavy[]) {
        this.ctx = ctx;
        this.voteSets = this.order(voteSets);
        this.totalPopulation = this.getTotalPopulation();
        this.grid = 20;
        this.cellSize = this.getCellSize();
        this.cells = this.createCells();
        this.init();
    }

    init() {
        const runs = 20;
        for (let i = 0; i < runs; i++) {
            this.run();
        }
        this.draw();
        this.report();
    }

    report() {
        // const totalSpaceLeft = this.cells.reduce((acc, cell) => {
        //     return acc + cell.getSpace();
        // }, 0);
        const cellsFull = this.cells.reduce((acc, cell) => {
            return acc + cell.getSpace() === 0 ? 1 : 0;
        }, 0);
        console.log("cellsFull: " + cellsFull);
    }

    run() {
        const biggest = this.voteSets[0];
        // console.log(biggest.municipality.title + " " + biggest.party?.name);
        const cell = this.getNearestCellWithSpaceForVoteSet(biggest);
        if (cell) {
            const space = cell.getSpace();
            if (biggest.votes < space) {
                cell.addVoteSet(biggest);
            } else {
                const rest = {
                    ...biggest,
                    votes: biggest.votes - space,
                };
                const newItem = {
                    ...biggest,
                    votes: space,
                };
                cell.addVoteSet(newItem);
                this.voteSets.push(rest);
            }
            const index = this.voteSets.indexOf(biggest);
            this.voteSets.splice(index, 1);
            // cell.log();
        } else {
            console.log("no nearest");
        }
    }

    draw() {
        for (const cell of this.cells) {
            cell.draw(this.ctx);
        }
    }

    getNearestCellWithSpaceForVoteSet(voteSet: VoteSetHeavy) {
        const cell = this.getExactCellForVoteSet(voteSet);
        if (!cell) {
            return null;
        } else {
            if (cell.isEmpty()) {
                console.log(
                    "empty cell, adding " +
                        voteSet.municipality.title +
                        " at [" +
                        cell.indexX +
                        ", " +
                        cell.indexY +
                        "]"
                );
                return cell;
            } else {
                console.log("not empty for " + voteSet.municipality.title);
                const max = 9;
                let distance = 0;
                let cellWithSpace = null;
                while (!cellWithSpace && distance < max) {
                    const neighbour = cell.getNeighbour(distance);
                    if (neighbour && neighbour.getSpace() > 0) {
                        cellWithSpace = neighbour;
                    }
                    distance++;
                }
                if (cellWithSpace) {
                    console.log(
                        "found neighbour at [" +
                            cellWithSpace.indexX +
                            ", " +
                            cellWithSpace.indexY +
                            "]"
                    );
                } else {
                    console.log("problem");
                }
                return cellWithSpace;
            }
        }
    }

    getExactCellForVoteSet(voteSet: VoteSetHeavy) {
        const longScale = boundingBox.x2 - boundingBox.x1;
        const deltaLong = voteSet.municipality.longitude - boundingBox.x1;
        const x = Math.round((deltaLong / longScale) * this.grid) - 1;
        const latScale = boundingBox.y1 - boundingBox.y2;
        const deltaLat = boundingBox.y1 - voteSet.municipality.latitude;
        const y = Math.round((deltaLat / latScale) * this.grid) - 1;
        return this.getCellFromCoordinates(x, y);
    }

    getCellFromCoordinates(x: number, y: number) {
        return this.cells.find(
            (cell) => cell.indexX === x && cell.indexY === y
        );
    }

    order(voteSets: VoteSetHeavy[]) {
        return voteSets.sort((a, b) => {
            return b.votes - a.votes;
        });
    }

    getTotalPopulation() {
        return this.voteSets.reduce((acc, voteSet) => {
            return acc + voteSet.votes;
        }, 0);
    }

    getCellSize() {
        const assumedOccupation = 0.25;
        const cells = this.grid * this.grid;
        const effectiveCells = Math.round(cells * assumedOccupation);
        return Math.round(this.totalPopulation / effectiveCells);
    }

    createCells() {
        const cells = [];
        const cellWidth = settings.width / this.grid;
        const cellHeight = settings.height / this.grid;
        for (let y = 0; y < this.grid; y += 1) {
            for (let x = 0; x < this.grid; x += 1) {
                cells.push(
                    new Cell(
                        this,
                        x,
                        y,
                        x * cellWidth,
                        y * cellHeight,
                        cellWidth,
                        cellHeight,
                        this.cellSize
                    )
                );
            }
        }
        return cells;
    }
}
