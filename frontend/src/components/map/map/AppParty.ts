import { App } from "./App";
import { Cell } from "./Cell";
import type { Party } from "../../../types";

export class AppParty {
    app: App;
    party: Party;
    cells: Cell[];
    height: number;
    population: number;
    x: number;
    y: number;

    constructor(app: App, party: Party) {
        this.app = app;
        this.party = party;
        this.cells = [];
        this.population = 0;
        this.height = 0;
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
        let y = baseY;
        const factor = 0.1;
        const barHeight = (this.app.width / 9) * factor;
        const margin = 2;
        for (const cell of this.cells) {
            cell.final.legend.x = x;
            cell.final.legend.y = y;
            cell.final.legend.height = barHeight;
            cell.final.legend.width =
                (cell.final.size * cell.final.size * factor) / barHeight;

            x += cell.final.legend.width;
            if (x > this.app.width) {
                x = this.x;
                y += barHeight + margin;
            }
        }

        this.height = y + barHeight - baseY;
    }

    drawLegend(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black";
        const fontSize = this.app.width / 43;
        ctx.font = fontSize + "px Arial";
        ctx.fillText(
            this.party.name + " (" + this.population + ")",
            this.app.width / 10,
            this.y + 0.5 * fontSize
        );
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.drawLegend(ctx);
        for (const cell of this.cells) {
            cell.draw2(ctx);
        }
    }
}
