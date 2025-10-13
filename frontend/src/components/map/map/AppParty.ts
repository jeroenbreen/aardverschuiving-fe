import { App } from "./App";
import { Cell } from "./Cell";
import type { Party } from "../../../types";

export class AppParty {
    app: App;
    party: Party;
    cells: Cell[];
    height: number;
    population: number;
    legendHeight: number;

    constructor(app: App, party: Party) {
        this.app = app;
        this.party = party;
        this.cells = [];
        this.population = 0;
        this.height = 0;
        this.legendHeight = this.app.width / 20;
    }

    addCell(cell: Cell) {
        this.cells.push(cell);
        this.population += cell.population;
    }

    sort() {
        this.cells.sort((a, b) => {
            return b.population - a.population;
        });
    }

    init() {
        this.sort();
        this.initCells();
    }

    initCells() {
        let x = 0;
        let y = 0;
        const margin = 2;
        let rowSize = this.app.width / this.app.gridHorizontal;
        for (const cell of this.cells) {
            cell.final.legend.x = x;
            cell.final.legend.y = y;

            x += cell.final.size + margin;
            if (x > this.app.width) {
                x = 0;
                console.log(rowSize);
                y += rowSize + margin;
                rowSize = cell.final.size;
            }
        }
        this.height = y + this.legendHeight;
    }

    drawLegend(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.fillStyle = "black";
        ctx.font = this.app.width / 35 + "px Arial";
        ctx.fillText(this.party.name + " (" + this.population + ")", x, y + 16);
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.drawLegend(ctx, x, y);
        for (const cell of this.cells) {
            cell.draw2(ctx, x, y + this.legendHeight);
        }
    }
}
