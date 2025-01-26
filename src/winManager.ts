import { Application, Container, Graphics, Text, TextStyle } from "pixi.js";
import { Reel, Win } from "./types";

const paytable: number[][] = [
    [0, 0, 0, 1, 2, 3],
    [0, 0, 0, 2, 3, 4],
    [0, 0, 0, 3, 4, 5],
    [0, 0, 0, 4, 5, 6],
    [0, 0, 0, 5, 6, 7],
    [0, 0, 0, 6, 7, 8],
    [0, 0, 0, 7, 8, 9],
    [0, 0, 0, 8, 9, 10],
    [0, 0, 0, 9, 10, 11],
    [0, 0, 0, 10, 11, 12],
    [0, 0, 0, 11, 12, 13],
    [0, 0, 0, 12, 13, 14],
    [0, 0, 0, 13, 14, 15],
    [0, 0, 0, 14, 15, 16],
    [0, 0, 0, 15, 16, 17]
]

export class WinManager {
    protected _winLabelContainer: Container = new Container();
    protected _winLabelText: Text = new Text();

    constructor(protected _pixiApp: Application) {
    }

    public init(): void {
        // winlabel
        this._pixiApp.stage.addChild(this._winLabelContainer);
        this._winLabelContainer.x = this._pixiApp.screen.width / 2;
        this._winLabelContainer.y = 350;
        this._winLabelContainer.visible = false;

        const winLabelBg = new Graphics().rect(-120, -30, 240, 60).fill({ color: 0x0, alpha: 0.5 });
        this._winLabelContainer.addChild(winLabelBg)

        this._winLabelText.text = "Won 44 coins"
        this._winLabelText.style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 28,
            fontWeight: 'bold',
            fill: 0xffff66,
        });
        this._winLabelText.anchor = 0.5;
        this._winLabelContainer.addChild(this._winLabelText);

    }

    public evaluateWins(reels: Reel[]) {
        // get the first symbols and record streak
        const reel0 = reels[0];
        let wins: Win[] = [];

        reel0.symbols.forEach(symbol => {

            let win: Win = {
                symbols: [symbol],
                amount: 0
            }

            let streak = 1;

            for (let i = 1; i < reels.length; i++) {
                const reel = reels[i];
                const match = reel.symbols.filter(nextSymbol => symbol.id === nextSymbol.id);

                if (match.length) {
                    match.forEach(matchedSymbol => {
                        win.symbols.push(matchedSymbol);
                    });

                    streak++;
                } else {
                    break;
                }
            }

            if (streak >= 3) {
                win.amount = this.getPayout(symbol.id, streak);
                wins.push(win);
            }
        });

        if (wins.length) {
            this.showNoWins(reels);
            this.showWins(wins);
        }
    }

    public hide(): void {
        this._winLabelContainer.visible = false;
    }

    protected getPayout(id: number, streak: number): number {
        return paytable[id][streak]
    }

    protected showNoWins(reels: Reel[]): void {
        reels.forEach(reel => {
            reel.symbols.forEach(symbol => symbol.noWin())
        })
    }

    protected showWins(wins: Win[]): void {
        wins.forEach(win => {
            win.symbols.forEach(symbol => symbol.win())
        })

        this._winLabelContainer.visible = true;

        const totalWin = wins.reduce((prev, curr) => prev += curr.amount, 0);

        this._winLabelText.text = `Won ${totalWin} coins`;
    }
}