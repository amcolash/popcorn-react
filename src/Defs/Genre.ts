import { Type } from './Type';

export default class Genre {

    public static getDefaultGenre(type : Type) : string {
        return this.getGenres(type)[0];
    }

    public static getGenres(type : Type) : string[] {
        switch (type) {
            case Type.Anime: return this.GenreAnime;
            default: return this.GenreTVMovie;
        }
    }

    private static readonly GenreAnime : string[] = [
        'All',
        'Action',
        'Adventure',
        'Comedy',
        'Dementia',
        'Demons',
        'Drama',
        'Ecchi',
        'Fantasy',
        'Game',
        'Gender Bender',
        'Gore',
        'Harem',
        'Historical',
        'Horror',
        'Kids',
        'Magic',
        'Mahou Shoujo',
        'Mahou Shounen',
        'Martial Arts',
        'Mecha',
        'Military',
        'Music',
        'Mystery',
        'Parody',
        'Police',
        'Psychological',
        'Racing',
        'Romance',
        'Samurai',
        'School',
        'Sci-Fi',
        'Shoujo Ai',
        'Shounen Ai',
        'Slice of Life',
        'Space',
        'Sports',
        'Super Power',
        'Supernatural',
        'Thriller',
        'Vampire',
        'Yuri',
    ];

    private static readonly GenreTVMovie : string[] = [
        'All',
        'Action',
        'Adventure',
        'Animation',
        'Comedy',
        'Crime',
        'Disaster',
        'Documentary',
        'Drama',
        'Eastern',
        'Family',
        'Fan-Film',
        'Fantasy',
        'Film-Noir',
        'History',
        'Holiday',
        'Horror',
        'Indie',
        'Music',
        'Mystery',
        'None',
        'Road',
        'Romance',
        'Science-Fiction',
        'Short',
        'Sports',
        'Sporting-Event',
        'Suspense',
        'Thriller',
        'TV-Movie',
        'War',
        'Western'
    ];
}