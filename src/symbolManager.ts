import { Symbol } from "./symbol";

export const symbolMap: { [key: number] : string } = {
    0: '9',
    1: '10',
    2: 'J',
    3: 'Q',
    4: 'K',
    5: 'A',
    6: 'M1',
    7: 'M2',
    8: 'M3',
    9: 'M4',
    10: 'M5',
    11: 'H1',
    12: 'H2',
    13: 'H3',
    14: 'H4',
    15: 'H5'
}

export class SymbolManager {

    constructor() {

    }

    public createSymbol(symbolId: number): Symbol {
        return new Symbol(symbolId);
    }
}