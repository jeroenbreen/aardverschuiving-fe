import { VoteSetHeavy, Callback, Municipality_id } from "../../../types";
import { Cell } from "./Cell";
import { AppParty } from "./AppParty";
import { boundingBox, ratio } from "./settings";
import { getDistanceBetweenCells } from "./shell";

export class App {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    voteSets: VoteSetHeavy[];
    activeVoteSets: VoteSetHeavy[];
    cells: Cell[];
    appParties: AppParty[];
    totalPopulation: number;
    cellPopulation: number;
    cellSize: number;
    gridHorizontal: number;
    gridVertical: number;
    skipped: number;
    turn: number;
    selectedParties: number[];
    cache: any;
    mapMode: boolean;
    winnerTakesAll: boolean;

    constructor(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        voteSets: VoteSetHeavy[],
        grid: number,
        onClick: Callback,
        selectedParties: number[],
        mapMode: boolean,
        winnerTakesAll: boolean
    ) {
        this.width = width;
        this.height = height;
        this.cellSize = 0;
        this.turn = 0;
        this.ctx = ctx;
        this.voteSets = this.order(voteSets);
        this.activeVoteSets = [];
        this.skipped = 0;
        this.totalPopulation = this.getTotalPopulation();
        this.selectedParties = selectedParties;
        this.appParties = [];
        this.cells = [];
        this.gridHorizontal = 0;
        this.gridVertical = 0;
        this.cellPopulation = 0;
        this.cache = {
            municipalities: {},
            coordinates: {},
        };
        this.mapMode = mapMode;
        this.winnerTakesAll = winnerTakesAll;
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

        this.activeVoteSets = this.filter(this.voteSets);

        for (let i = 0; i < runs; i++) {
            if (this.activeVoteSets.length > 0) {
                this.run();
            }
        }

        for (const cell of this.cells) {
            cell.finish();
        }
        this.gatherForParties();
        this.mapMode ? this.drawMap() : this.drawLegend();
    }

    filter(voteSets: VoteSetHeavy[]) {
        interface Item {
            id: Municipality_id;
            vs: VoteSetHeavy[];
        }
        const lib: Item[] = [];
        const result: VoteSetHeavy[] = [];

        const prefilter = voteSets.filter((vs) =>
            this.selectedParties.includes(vs.party?.id || -1)
        );

        if (this.winnerTakesAll) {
            for (const vs of prefilter) {
                const municipality_id = vs.municipality.id;
                const item = lib.find((i) => i.id === municipality_id);
                if (!item) {
                    lib.push({
                        id: municipality_id,
                        vs: [vs],
                    });
                } else {
                    item.vs.push(vs);
                }
            }
            for (const item of lib) {
                item.vs.sort((a, b) => b.votes - a.votes);
                // only filter the winner
                result.push(item.vs[0]);
            }
            return result;
        } else {
            return prefilter;
        }
    }

    switchMode(mapMode: boolean) {
        this.mapMode = mapMode;
        const time = 400;
        const ticks = 20;
        let currentTick = 0;
        let interval = 0;

        const tick = (part: number) => {
            this.clear();
            for (const cell of this.cells) {
                const party = cell.getParty();
                if (party) {
                    if (this.selectedParties.includes(party.id)) {
                        cell.switch(mapMode, part, this.ctx);
                    }
                }
            }
            if (!mapMode && part >= 0.75) {
                for (const appParty of this.appParties) {
                    if (this.selectedParties.includes(appParty.party.id)) {
                        appParty.drawLegend(this.ctx);
                    }
                }
            }
            if (part >= 1) {
                clearInterval(interval);
            }
        };

        interval = setInterval(() => {
            tick(currentTick / ticks);
            currentTick++;
        }, time / ticks);
    }

    gatherForParties() {
        for (const cell of this.cells) {
            const partyOfCell = cell.getParty();
            if (partyOfCell) {
                let appParty = this.appParties.find(
                    (p) => p.party === partyOfCell
                );
                if (!appParty) {
                    appParty = new AppParty(this, partyOfCell);
                    this.appParties.push(appParty);
                }
                appParty.addCell(cell);
            }
        }
        const x = this.width / 3;
        let y = this.height / 3.5;
        this.appParties.sort((a, b) => b.population - a.population);
        for (const appParty of this.appParties) {
            appParty.init(x, y);
            y += appParty.height + this.width / 25;
        }
    }

    drawLegend() {
        for (const appParty of this.appParties) {
            if (this.selectedParties.includes(appParty.party.id)) {
                appParty.draw(this.ctx);
            }
        }
    }

    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.width + 2 * (this.width / 10),
            this.height + 2 * (this.width / 10)
        );
    }

    initClick(onClick: Callback) {
        const canvas = this.ctx.canvas;
        canvas.addEventListener("click", (e) => {
            const cv = canvas as any;
            const coordinates = cv.relMouseCoords(e);
            const areaX = coordinates.x - this.width / 10;
            const areaY = coordinates.y - this.width / 10;
            // check if is inside area box
            if (areaX > 0 && areaY > 0) {
                const indexX = Math.floor(
                    (areaX / this.width) * this.gridHorizontal
                );
                const indexY = Math.floor(
                    (areaY / this.height) * this.gridVertical
                );
                const cell = this.getCellFromCoordinates(indexX, indexY);
                if (cell && cell.show(this.selectedParties)) {
                    onClick(cell);
                }
            }
        });
    }

    getReport() {
        // nl width 264km height 312km
        const cellDistance = 264 / this.gridHorizontal;
        let presentPopulation = 0;
        for (const appParty of this.appParties) {
            if (this.selectedParties.includes(appParty.party.id)) {
                presentPopulation += appParty.population;
            }
        }

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
        const biggest = this.activeVoteSets[0];
        // console.log(biggest.municipality.title + " " + biggest.party?.name);
        const { cell, distance } =
            this.getNearestCellWithSpaceForVoteSet(biggest);
        if (cell) {
            const space = cell.getSpace();
            if (biggest.votes < space) {
                const itemWithDistance: VoteSetHeavy = {
                    ...biggest,
                    distance,
                };
                cell.addVoteSet(itemWithDistance);
            } else {
                const rest: VoteSetHeavy = {
                    ...biggest,
                    votes: biggest.votes - space,
                    distance,
                };
                const newItemWithDistance: VoteSetHeavy = {
                    ...biggest,
                    votes: space,
                    distance,
                };
                cell.addVoteSet(newItemWithDistance);
                this.insert(rest);
            }
            const index = this.activeVoteSets.indexOf(biggest);
            this.activeVoteSets.splice(index, 1);
        } else {
            // console.log("skipped");
            this.skipped += biggest.votes;
            const index = this.activeVoteSets.indexOf(biggest);
            this.activeVoteSets.splice(index, 1);
        }
    }

    insert(voteSet: VoteSetHeavy) {
        const getIndex = (voteSet: VoteSetHeavy) => {
            for (let i = 0; i < this.voteSets.length; i++) {
                const item = this.voteSets[i];
                if (voteSet.votes > item.votes) {
                    return i;
                }
            }
            return -1;
        };
        const index = getIndex(voteSet);
        this.voteSets.splice(index, 0, voteSet);
    }

    drawMap() {
        for (const cell of this.cells) {
            cell.draw(this.ctx, this.selectedParties);
        }
    }

    updateSelectedParties(selectedParties: number[]) {
        this.clear();
        this.selectedParties = selectedParties;
        this.mapMode ? this.drawMap() : this.drawLegend();
    }

    getNearestCellWithSpaceForVoteSet(voteSet: VoteSetHeavy) {
        const cell = this.getExactCellForVoteSet(voteSet);
        if (!cell) {
            return { cell: null, distance: 0 };
        } else {
            if (
                cell.isEmpty() ||
                (voteSet.party &&
                    cell.matchesParty(voteSet.party) &&
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
                while (!cellWithSpace && shellPosition < max) {
                    const neighbour = cell.getNeighbour(shellPosition);
                    if (
                        neighbour &&
                        neighbour.getSpace() > 0 &&
                        voteSet.party &&
                        neighbour.matchesParty(voteSet.party)
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
        const municipality_id = voteSet.municipality.id;
        if (this.cache.municipalities[municipality_id]) {
            return this.cache.municipalities[municipality_id];
        } else {
            const longScale = boundingBox.x2 - boundingBox.x1;
            const deltaLong = voteSet.municipality.longitude - boundingBox.x1;
            const x =
                Math.round((deltaLong / longScale) * this.gridHorizontal) - 1;
            const latScale = boundingBox.y1 - boundingBox.y2;
            const deltaLat = boundingBox.y1 - voteSet.municipality.latitude;
            const y = Math.round((deltaLat / latScale) * this.gridVertical) - 1;
            const cell = this.getCellFromCoordinates(x, y);
            this.cache.municipalities[municipality_id] = cell;
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
            return b.votes - a.votes;
        });
    }

    getTotalPopulation() {
        return this.voteSets.reduce((acc, voteSet) => {
            return acc + voteSet.votes;
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
