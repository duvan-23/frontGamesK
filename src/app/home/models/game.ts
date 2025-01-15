export interface IGame {
    games:IPropertiesGame[]
    
}
export interface IPropertiesGame{
    id: string;
    slug: string;
    title: string;
    providerName: string;
    thumb: IThumb | null
}
interface IThumb{
    url: string;
}