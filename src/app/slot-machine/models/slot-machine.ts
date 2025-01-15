export interface ISlotMachine {
    parameters: IParameters;
}
export interface IParameters{
    reels: string[][];
    coins: number;
    fruits: string[];
}
export interface ICalculateResult {
    result: string[];
    coins: number;
}

export interface IResponse {
    parameters:IParametersResponse
}
interface IParametersResponse{
    text: string;
    coins: number;
    won: number;
}