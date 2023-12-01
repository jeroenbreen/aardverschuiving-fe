import { VoteSetHeavy } from "../../../types";
import { Cell } from "./Cell";
import { settings, boundingBox, ratio } from "./settings";

// todo cache coordinates for each municipality

export class App {
    ctx: CanvasRenderingContext2D;
    voteSets: VoteSetHeavy[];
    cells: Cell[];
    totalPopulation: number;
    cellSize: number;
    gridHorizontal: number;
    gridVertical: number;
    skipped: number;
    // chunks: VoteSetHeavy[];

    constructor(ctx: CanvasRenderingContext2D, voteSets: VoteSetHeavy[]) {
        this.ctx = ctx;
        this.voteSets = this.order(voteSets);
        this.totalPopulation = this.getTotalPopulation();
        this.gridHorizontal = settings.grid;
        this.gridVertical = Math.round(this.gridHorizontal * ratio);
        this.skipped = 0;
        this.cellSize = this.getCellSize();
        this.cells = this.createCells();
        this.init();
    }

    init() {
        const runs = 10000;
        for (let i = 0; i < runs; i++) {
            if (this.voteSets.length > 0) {
                this.run();
            }
        }
        this.draw();
        this.report();
    }

    report() {
        const usedPopulation = this.cells.reduce((acc, cell) => {
            return acc + cell.getPopulation();
        }, 0);

        const drawnPopulation = this.cells.reduce((acc, cell) => {
            return acc + (cell.doDraw() ? cell.getPopulation() : 0);
        }, 0);
        console.log("usedPopulation: " + usedPopulation);
        console.log("voteSets left: " + this.voteSets.length);
        console.log("Skipped: " + this.skipped);
        console.log(
            "Drawn %: " +
                Math.round(100 * (drawnPopulation / this.totalPopulation)) +
                "%"
        );
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
        } else {
            this.skipped += biggest.votes;
            const index = this.voteSets.indexOf(biggest);
            this.voteSets.splice(index, 1);
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
                // console.log(
                //     "empty cell, adding " +
                //         voteSet.municipality.title +
                //         " at [" +
                //         cell.indexX +
                //         ", " +
                //         cell.indexY +
                //         "]"
                // );
                return cell;
            } else {
                // console.log("not empty for " + voteSet.municipality.title);
                const max = 250;
                let distance = 0;
                let cellWithSpace = null;
                // todo keep score of nearest available neighbour
                while (!cellWithSpace && distance < max) {
                    const neighbour = cell.getNeighbour(distance);
                    if (
                        neighbour &&
                        neighbour.getSpace() > 0 &&
                        voteSet.party &&
                        neighbour.matchesParty(voteSet.party)
                    ) {
                        cellWithSpace = neighbour;
                    }
                    distance++;
                }
                // if (cellWithSpace) {
                //     console.log(
                //         "found neighbour at [" +
                //             cellWithSpace.indexX +
                //             ", " +
                //             cellWithSpace.indexY +
                //             "]"
                //     );
                // }

                return cellWithSpace;
            }
        }
    }

    getExactCellForVoteSet(voteSet: VoteSetHeavy) {
        const longScale = boundingBox.x2 - boundingBox.x1;
        const deltaLong = voteSet.municipality.longitude - boundingBox.x1;
        const x = Math.round((deltaLong / longScale) * this.gridHorizontal) - 1;
        const latScale = boundingBox.y1 - boundingBox.y2;
        const deltaLat = boundingBox.y1 - voteSet.municipality.latitude;
        const y = Math.round((deltaLat / latScale) * this.gridVertical) - 1;
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
        const cells = this.gridHorizontal * this.gridVertical;
        const effectiveCells = Math.round(cells * assumedOccupation);
        return Math.round(this.totalPopulation / effectiveCells);
    }

    createCells() {
        const cells = [];
        const size = settings.width / this.gridHorizontal;
        for (let y = 0; y < this.gridVertical; y += 1) {
            for (let x = 0; x < this.gridHorizontal; x += 1) {
                cells.push(
                    new Cell(
                        this,
                        x,
                        y,
                        x * size,
                        y * size,
                        size,
                        this.cellSize
                    )
                );
            }
        }
        return cells;
    }
}
