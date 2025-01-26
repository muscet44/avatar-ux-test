import { Container, Sprite, Texture } from "pixi.js";
import { getTextureByName } from "./resourceManager";
import { symbolMap } from "./symbolManager";

export class Symbol {

    protected _container: Container;
    protected _mainTexture: Texture = new Texture();
    protected _winTexture: Texture = new Texture();
    protected _sprite: Sprite = new Sprite();

    constructor(private _id: number) {
        this._container = new Container();
        this.initTextures();
    }

    public get id(): number {
        return this._id;
    }

    public get container(): Container {
        return this._container;
    }

    public get x(): number {
        return this._container.x;
    }

    public get y(): number {
        return this._container.y;
    }

    public set x(x: number) {
        this._container.x = x;
    }

    public set y(y: number) {
        this._container.y = y;
    }

    public setSymbol(symbolId: number) {
        this._id = symbolId;
        this.setTextures();
    }

    public win(): void {
        this._sprite.texture = this._winTexture;
        this._sprite.tint = 0xffffff;
    }

    public noWin(): void {
        this._sprite.tint = 0x999999;
    }

    public stop(): void {
        this._sprite.texture = this._mainTexture;
        this._sprite.tint = 0xffffff;
    }

    protected initTextures(): void {
        this.setTextures();
        this._sprite.anchor = 0.5;
        this._container.addChild(this._sprite);        
        this._container.scale = 0.5;
    }

    protected setTextures(): void {
        const symbolName = symbolMap[this._id];
        this._mainTexture = Texture.from(getTextureByName(symbolName));
        this._winTexture = Texture.from(getTextureByName(symbolName, true));
        this._sprite.texture = this._mainTexture;
    }
}