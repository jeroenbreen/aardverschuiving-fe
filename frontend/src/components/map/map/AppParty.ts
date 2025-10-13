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
    x: number;
    y: number;

    constructor(app: App, party: Party) {
        this.app = app;
        this.party = party;
        this.cells = [];
        this.population = 0;
        this.height = 0;
        this.legendHeight = this.app.width / 20;
        this.x = 0;
        this.y = 0;
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

    init(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.sort();
        this.initCells(x, y);
    }

    initCells(baseX: number, baseY: number) {
        let x = baseX;
        let y = baseY + this.legendHeight;
        const margin = 2;
        let rowSize = this.app.width / this.app.gridHorizontal;
        for (const cell of this.cells) {
            cell.final.legend.x = x;
            cell.final.legend.y = y;

            x += cell.final.size + margin;
            if (x > this.app.width) {
                x = this.x;
                y += rowSize + margin;
                rowSize = cell.final.size;
            }
        }
        this.height = y - baseY;
    }

    drawLegend(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black";
        ctx.font = this.app.width / 35 + "px Arial";
        ctx.fillText(
            this.party.name + " (" + this.population + ")",
            this.x,
            this.y + 16
        );
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.drawLegend(ctx);
        for (const cell of this.cells) {
            cell.draw2(ctx);
        }
    }
}
