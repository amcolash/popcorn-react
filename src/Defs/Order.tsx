import { Type } from './Type';

export enum OrderSort {
    Ascending = 1,
    Descending = -1
}

export default class Genre {
    private readonly OrderAnime:string[] = [
        'Name',
        'Year',
        'Rating',
    ];

    private readonly OrderMovie:string[] = [
        'Date Added',
        'Trending',
        'Title',
        'Year',
        'Rating',
    ];

    private readonly OrderTV:string[] = [
        'Updated',
        'Trending',
        'Name',
        'Year',
        'Rating',
    ];

    public getOrder(type : Type) : string[] {
        switch (type) {
            case Type.Anime: return this.OrderAnime;
            case Type.Movie: return this.OrderMovie;
            default: return this.OrderTV;
        }
    }
}