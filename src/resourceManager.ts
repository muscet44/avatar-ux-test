import { Assets } from "pixi.js";
import { symbolMap } from "./symbolManager";

export function getTextureByName(name: string, connect: boolean = false): string {
    return `./${name}${connect ? '_connect' : ''}.png`
}

export class ResourceManager {
    public async init(): Promise<Record<string, any>> {
        let assetsNames: string[] = [];

        Object.values(symbolMap).forEach(symbolName => {
            assetsNames.push(
                getTextureByName(symbolName),
                getTextureByName(symbolName, true)
            )
        });
        
        return await Assets.load(assetsNames);
    }
}
