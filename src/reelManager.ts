import { Application, Container } from "pixi.js";
import { Reel, ReelConfig, ReelTween } from "./types";
import { SymbolManager, symbolMap } from "./symbolManager";

export class ReelManager {
    protected _reels: Reel[] = [];
    protected _tweening: ReelTween[] = [];
    protected _isRunning: boolean = false;

    public get isRunning(): boolean {
        return this._isRunning;
    }

    public get reels(): Reel[] {
        return this._reels;
    }

    constructor(
        protected _reelConfig: ReelConfig,
        protected _pixiApp: Application,
        protected _symbolManager: SymbolManager
    ) { }

    public init(): void {
        this.initReels();
        this.initTicker();
    }

    public start(endCallback: Function): void {
        this._isRunning = true;

        for (let i = 0; i < this._reels.length; i++) {
            const reel = this._reels[i];

            // add fake symbols and next real symbols
            const fakeSymbols = 5;
            for ( let j = 0; j < fakeSymbols + this._reelConfig.row; j++ ) {
                const symbol = this._symbolManager.createSymbol(getRandomSymbolId())
                reel.container.addChildAt(symbol.container, 0);
                reel.symbols.unshift(symbol);
            }

            const symbolsAdded = fakeSymbols + this._reelConfig.row;

            // re-set reel position
            reel.container.y = -symbolsAdded * this._reelConfig.symbolSize;

            // re-set symbols position
            reel.symbols.forEach((symbol, index) => {
                symbol.y = this._reelConfig.symbolSize * index;
            });

            const target = 0;
            const time = 500 + i * 300;

            this.tweenTo(
                reel,
                reel.container.y,
                target,
                time,
                backout(0.5),
                i === this._reelConfig.reel - 1 ?
                    () => {
                        this._isRunning = false;
                        this.trimReel(reel);
                        endCallback();
                    } :
                    () => {
                        this.trimReel(reel);
                    }
            );
        }
    }

    protected initReels(): void {
        // Build the reels
        const reelsContainer = new Container();

        for (let i = 0; i < this._reelConfig.reel; i++) {
            const reelContainer = new Container();

            reelContainer.x = i * this._reelConfig.reelWidth;
            reelsContainer.addChild(reelContainer);

            const reel: Reel = {
                symbols: [],
                container: reelContainer,
                // position: 0
            };

            // Build the symbols
            for (let j = 0; j < this._reelConfig.row; j++) {

                const randomSymbolId = getRandomSymbolId();
                const symbol = this._symbolManager.createSymbol(randomSymbolId);
                symbol.y = j * this._reelConfig.symbolSize;
                reelContainer.addChild(symbol.container);
                reel.symbols.push(symbol);
            }

            this._reels.push(reel);
        }

        this._pixiApp.stage.addChild(reelsContainer);

        const marginTop = 200;
        const reelsWidth = this._reelConfig.reelWidth * this._reelConfig.reel;

        reelsContainer.y = marginTop + this._reelConfig.symbolSize / 2;
        reelsContainer.x = this._pixiApp.screen.width / 2 - reelsWidth / 2 + this._reelConfig.symbolSize / 2;

    }

    protected initTicker(): void {
        // Listen for animate update.
        this._pixiApp.ticker.add(() => {

            // reel tweener
            const now = Date.now();
            const remove = [];

            for (let i = 0; i < this._tweening.length; i++) {
                const tween = this._tweening[i];
                const phase = Math.min(1, (now - tween.start) / tween.time);

                tween.reel.container.y = lerp(tween.value, tween.target, tween.easing(phase));

                if (phase === 1) {
                    tween.reel.container.y = tween.target;                    
                    if (tween.complete) tween.complete(tween);
                    remove.push(tween);
                }
            }

            for (let i = 0; i < remove.length; i++) {
                this._tweening.splice(this._tweening.indexOf(remove[i]), 1);
            }


            // Update the slots.
            // for (let i = 0; i < this._reels.length; i++) {
            //     const reel = this._reels[i];

            //     // Update symbol positions on reel.
            //     for (let j = 0; j < reel.symbols.length; j++) {
            //         const symbol = reel.symbols[j];
            //         const prevy = symbol.y;

            //         symbol.y = ((reel.position + j) % reel.symbols.length) * this._reelConfig.symbolSize - this._reelConfig.symbolSize;
            //         if (symbol.y < 0 && prevy > this._reelConfig.symbolSize) {
            //             symbol.setSymbol(getRandomSymbolId())
            //         }
            //     }
            // }
        });
    }

    protected tweenTo(
        reel: Reel,
        value: number,
        target: number,
        time: number,
        easing: (t: number) => number,
        oncomplete: Function | null
    ): void {
        const tween: ReelTween = {
            reel,
            value,
            target,
            easing,
            time,
            complete: oncomplete,
            start: Date.now(),
        };

        this._tweening.push(tween);
    }

    protected trimReel(reel: Reel): void {
        reel.symbols = reel.symbols.slice(0, this._reelConfig.row);
        reel.container.removeChildren(this._reelConfig.row, reel.container.children.length)
    }
}


// Basic lerp funtion.
function lerp(a1: number, a2: number, t: number): number {
    return a1 * (1 - t) + a2 * t;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount: number) {
    return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
}

// let a = 0;

function getRandomSymbolId(): number {
    // return ++a % 4;
    return Math.floor(Math.random() * Object.keys(symbolMap).length);
}