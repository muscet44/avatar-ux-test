import { Container } from "pixi.js";
import { Symbol } from "./symbol";

export interface ReelConfig {
    reel: number,
    row: number,
    reelWidth: number,
    symbolSize: number
}

export interface Reel {
    symbols: Symbol[],
    container: Container,
    position: number
}

export interface ReelTween {
    reel: Reel,
    value: number,
    target: number,
    easing: (t: number) => number,
    time: number,
    complete: Function | null,
    start: number
}