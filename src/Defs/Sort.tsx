import { Type } from './Type';

export default class Sort {

    public static getDefaultSort(type: Type): string {
        return this.getSort(type)[0];
    }

    public static getSort(type: Type): string[] {
        switch (type) {
            case Type.Anime: return this.SortAnime;
            case Type.Movie: return this.SortMovie;
            default: return this.SortTV;
        }
    }

    private static readonly SortAnime:string[] = [
        'Name',
        'Year',
        'Rating',
    ];

    private static readonly SortMovie:string[] = [
        'Date Added',
        'Trending',
        'Title',
        'Year',
        'Rating',
    ];

    private static readonly SortTV:string[] = [
        'Updated',
        'Trending',
        'Name',
        'Year',
        'Rating',
    ];
}