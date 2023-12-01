import { VoteSetHeavy, Callback } from "../../types";
import { App } from "./classes/App";
import { settings, ratio } from "./classes/settings";

export const render = (
    canvas: HTMLCanvasElement,
    voteSets: VoteSetHeavy[],
    onClick: Callback,
    grid: number
) => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
        canvas.width = settings.width;
        canvas.height = settings.width * ratio;
        const app = new App(
            ctx,
            canvas.width,
            canvas.height,
            voteSets,
            grid,
            onClick
        );
    }
};
