import {
    VoteSetHeavy,
    Callback,
    VoteSetHeavyWithDistance,
} from "../../../types";
import { Cell } from "./Cell";
import { boundingBox, ratio } from "./settings";
import { getDistanceBetweenCells } from "./shell";

// todo cache coordinates for each municipality

export class App {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    voteSets: VoteSetHeavy[];
    cells: Cell[];
    totalPopulation: number;
    cellPopulation: number;
    cellSize: number;
    gridHorizontal: number;
    gridVertical: number;
    skipped: number;
    turn: number;
    selectedParties: number[];
    cache: any;

    constructor(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        voteSets: VoteSetHeavy[],
        grid: number,
        onClick: Callback,
        selectedParties: number[]
    ) {
        this.width = width;
        this.height = height;
        this.cellSize = 0;
        this.turn = 0;
        this.ctx = ctx;
        this.voteSets = this.order(voteSets);
        this.skipped = 0;
        this.totalPopulation = this.getTotalPopulation();
        this.selectedParties = selectedParties;
        this.cells = [];
        this.gridHorizontal = 0;
        this.gridVertical = 0;
        this.cellPopulation = 0;
        this.cache = {
            municipalities: {},
            coordinates: {},
        };
        //
        this.initClick(onClick);
        this.init(grid);
    }

    init(grid: number) {
        this.clear();
        this.gridHorizontal = grid;
        this.gridVertical = Math.round(this.gridHorizontal * ratio);
        this.cellPopulation = this.getCellPopulation();
        this.cells = this.createCells();
        const runs = 10000;
        for (let i = 0; i < runs; i++) {
            if (this.voteSets.length > 0) {
                this.run();
            }
        }
        this.draw();
    }

    updateGrid(grid: number, voteSets: VoteSetHeavy[]) {
        this.cells = [];
        this.voteSets = this.order(voteSets);
        this.init(grid);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    initClick(onClick: Callback) {
        this.ctx.canvas.addEventListener("click", (e) => {
            const bb = this.ctx.canvas.getBoundingClientRect();
            const x = e.clientX - bb.x;
            const y = e.clientY - bb.y;
            const xs = Math.floor((x / this.width) * this.gridHorizontal);
            const ys = Math.floor((y / this.height) * this.gridVertical);
            const cell = this.getCellFromCoordinates(xs, ys);
            if (cell) {
                onClick(cell);
            }
        });
    }

    getReport() {
        // nl width 264km height 312km
        const cellDistance = 264 / this.gridHorizontal;
        const presentPopulation = this.cells.reduce((acc, cell) => {
            return acc + cell.population;
        }, 0);

        const displacement = Math.round(
            (this.cells.reduce((acc, cell) => {
                return acc + cell.getTotalDistance();
            }, 0) *
                cellDistance) /
                presentPopulation
        );

        return {
            presentPopulation,
            totalPopulation: this.totalPopulation,
            coverage:
                Math.round(1000 * (presentPopulation / this.totalPopulation)) /
                10,
            displacement,
        };
    }

    run() {
        const biggest = this.voteSets[0];
        // console.log(biggest.municipality.title + " " + biggest.party?.name);
        const { cell, distance } =
            this.getNearestCellWithSpaceForVoteSet(biggest);
        if (cell) {
            const space = cell.getSpace();
            if (biggest[3] < space) {
                const itemWithDistance: VoteSetHeavyWithDistance = [
                    biggest[0],
                    biggest[1],
                    biggest[2],
                    biggest[3],
                    distance,
                ];
                cell.addVoteSet(itemWithDistance);
            } else {
                const rest: VoteSetHeavy = [
                    biggest[0],
                    biggest[1],
                    biggest[2],
                    biggest[3] - space,
                ];
                const newItemWithDistance: VoteSetHeavyWithDistance = [
                    biggest[0],
                    biggest[1],
                    biggest[2],
                    space,
                    distance,
                ];
                cell.addVoteSet(newItemWithDistance);
                this.voteSets.push(rest);
            }
            const index = this.voteSets.indexOf(biggest);
            this.voteSets.splice(index, 1);
        } else {
            this.skipped += biggest[3];
            const index = this.voteSets.indexOf(biggest);
            this.voteSets.splice(index, 1);
        }
    }

    draw() {
        for (const cell of this.cells) {
            cell.draw(this.ctx, this.selectedParties);
        }
    }

    updateSelectedParties(selectedParties: number[]) {
        this.clear();
        this.selectedParties = selectedParties;
        this.draw();
    }

    getNearestCellWithSpaceForVoteSet(voteSet: VoteSetHeavy) {
        const cell = this.getExactCellForVoteSet(voteSet);
        if (!cell) {
            return { cell: null, distance: 0 };
        } else {
            if (
                cell.isEmpty() ||
                (voteSet[2] &&
                    cell.matchesParty(voteSet[2]) &&
                    cell.getSpace() > 0)
            ) {
                // keep score of the first use
                cell.turn = this.turn;
                this.turn++;
                return { cell, distance: 0 };
            } else {
                const max = 250;
                let shellPosition = 0;
                let cellWithSpace = null;
                // todo keep score of nearest available neighbour
                while (!cellWithSpace && shellPosition < max) {
                    const neighbour = cell.getNeighbour(shellPosition);
                    if (
                        neighbour &&
                        neighbour.getSpace() > 0 &&
                        voteSet[2] &&
                        neighbour.matchesParty(voteSet[2])
                    ) {
                        cellWithSpace = neighbour;
                    }
                    shellPosition++;
                }
                return {
                    cell: cellWithSpace,
                    distance: cellWithSpace
                        ? getDistanceBetweenCells(cell, cellWithSpace)
                        : 0,
                };
            }
        }
    }

    getExactCellForVoteSet(voteSet: VoteSetHeavy) {
        const code = voteSet[1].cbs_code;
        if (this.cache.municipalities[code]) {
            return this.cache.municipalities[code];
        } else {
            const longScale = boundingBox.x2 - boundingBox.x1;
            const deltaLong = voteSet[1].longitude - boundingBox.x1;
            const x =
                Math.round((deltaLong / longScale) * this.gridHorizontal) - 1;
            const latScale = boundingBox.y1 - boundingBox.y2;
            const deltaLat = boundingBox.y1 - voteSet[1].latitude;
            const y = Math.round((deltaLat / latScale) * this.gridVertical) - 1;
            const cell = this.getCellFromCoordinates(x, y);
            this.cache.municipalities[code] = cell;
            return cell;
        }
    }

    getCellFromCoordinates(x: number, y: number) {
        if (this.cache.coordinates[x + "-" + y]) {
            return this.cache.coordinates[x + "-" + y];
        } else {
            const cell = this.cells.find(
                (cell) => cell.indexX === x && cell.indexY === y
            );
            this.cache.coordinates[x + "-" + y] = cell;
            return cell;
        }
    }

    order(voteSets: VoteSetHeavy[]) {
        return voteSets.sort((a, b) => {
            return b[3] - a[3];
        });
    }

    getTotalPopulation() {
        return this.voteSets.reduce((acc, voteSet) => {
            return acc + voteSet[3];
        }, 0);
    }

    getCellPopulation() {
        const assumedOccupation = 0.25;
        const cells = this.gridHorizontal * this.gridVertical;
        const effectiveCells = Math.round(cells * assumedOccupation);
        return Math.round(this.totalPopulation / effectiveCells);
    }

    createCells() {
        const cells = [];
        const size = this.width / this.gridHorizontal;
        this.cellSize = size;
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
                        this.cellPopulation
                    )
                );
            }
        }
        return cells;
    }
}
