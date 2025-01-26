import { Application } from "pixi.js";
import { ReelManager } from "./reelManager";
import { ResourceManager } from "./resourceManager";
import { ReelConfig } from "./types";
import { SymbolManager } from "./symbolManager";
import { UIManager } from "./uiManager";
import { WinManager } from "./winManager";

export class Game {
    protected _resourceManager: ResourceManager;
    protected _symbolManager: SymbolManager;
    protected _reelManager: ReelManager;
    protected _uiManager: UIManager;
    protected _winManager: WinManager;

    constructor(pixiApp: Application, reelConfig: ReelConfig) {
        this._resourceManager = new ResourceManager();
        this._symbolManager = new SymbolManager();
        this._reelManager = new ReelManager(reelConfig, pixiApp, this._symbolManager);
        this._uiManager = new UIManager(reelConfig, pixiApp);
        this._winManager = new WinManager(pixiApp);
    }

    public async init() {
        await this._resourceManager.init();
        this._reelManager.init();

        // add callback for spin
        this._uiManager.init(() => {
            if ( this._reelManager.isRunning ) return;

            this._reelManager.start(() => {
                this._winManager.evaluateWins(this._reelManager.reels)
            });

            this._winManager.hide();
        });

        this._winManager.init();
    }
}