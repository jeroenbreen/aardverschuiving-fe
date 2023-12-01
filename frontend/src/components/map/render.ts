import { VoteSetHeavy } from "../../types";
import { App } from "./classes/App";
import { settings } from "./classes/settings";

export const render = (
    el: HTMLElement,
    voteSets: VoteSetHeavy[],
    onClick: () => void
) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
        canvas.width = settings.width;
        canvas.height = settings.height;
        el.replaceChildren(canvas);
        const app = new App(ctx, voteSets);
        console.log(app);
    }
};
