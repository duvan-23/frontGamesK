export interface IGame {
    id: string;
    slug: string;
    title: string;
    providerName: string;
    thumb: IThumb | null
}

interface IThumb{
    url: string;
}