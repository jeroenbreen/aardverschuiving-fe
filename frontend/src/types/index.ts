export * from "./municipalities";
export * from "./elections";
export * from "./parties";
export * from "./votes";
export * from "./map";

declare global {
    interface Window {
        bertin: any;
    }
}
