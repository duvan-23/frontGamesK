export interface ISlotMachine {
    reels: string[][];
    coins: number;
    fruits: string[];
}

export interface ICalculateResult {
    result: string[];
    coins: number;
}

export interface IResponse {
    text: string;
    coins: number;
    won: number;
}