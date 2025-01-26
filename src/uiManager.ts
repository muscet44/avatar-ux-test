import { Application, Graphics, Text, TextStyle } from "pixi.js";
import { ReelConfig } from "./types";

export class UIManager {
    constructor(
        protected _reelConfig: ReelConfig,
        protected _pixiApp: Application
    ) { }

    public init(spinCallback: () => void): void {
        const { screen } = this._pixiApp;
        const marginTop = 200;
        const reelHeight = this._reelConfig.row * this._reelConfig.symbolSize;
        const top = new Graphics().rect(0, 0, screen.width, marginTop).fill({ color: 0x0 });
        const bottom = new Graphics().rect(0, 0, screen.width, screen.height - marginTop - reelHeight).fill({ color: 0x0 });
        bottom.y = marginTop + reelHeight;

        this._pixiApp.stage.addChild(top);
        this._pixiApp.stage.addChild(bottom);

        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            fill: 0xffffff,
        });

        // Header
        const headerText = new Text('AvatarUX Test', style);
        headerText.x = Math.round((top.width - headerText.width) / 2);
        headerText.y = Math.round((marginTop - headerText.height) / 2);
        top.addChild(headerText);

        // Spin Button
        const spinText = new Text('Spin', style);
        spinText.x = Math.round((bottom.width - spinText.width) / 2);
        spinText.y = 20;
        bottom.addChild(spinText);

        bottom.eventMode = 'static';
        bottom.cursor = 'pointer';
        bottom.addListener('pointerdown', () => {
            spinCallback();
        });
    }
}