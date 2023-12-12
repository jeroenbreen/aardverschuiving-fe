export * from "./municipalities";
export * from "./elections";
export * from "./parties";
export * from "./votes";
export * from "./map";
export * from "./relations";
export * from "./other";

declare global {
    interface Window {
        config: {
            votes: {
                min: number;
                max: number;
            };
        };
    }
}
