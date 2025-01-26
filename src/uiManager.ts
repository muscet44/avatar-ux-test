import { Application, Graphics, Text, TextStyle } from "pixi.js";

export class UIManager {
    constructor(protected _pixiApp: Application) {

    }

    public init(spinCallback: () => void): void {
        const marginTop = 200;
        const top = new Graphics().rect(0, 0, this._pixiApp.screen.width, marginTop).fill({ color: 0x0 });
        const bottom = new Graphics().rect(0, 0, this._pixiApp.screen.width, marginTop).fill({ color: 0x0 });
        bottom.y = 500;

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
        const playText = new Text('Spin', style);
        playText.x = Math.round((bottom.width - playText.width) / 2);
        playText.y = 20;
        bottom.addChild(playText);

        bottom.eventMode = 'static';
        bottom.cursor = 'pointer';
        bottom.addListener('pointerdown', () => {
            spinCallback();
        });
    }
}