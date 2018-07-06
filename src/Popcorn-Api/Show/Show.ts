// Generated by https://quicktype.io

/**
 * This is an array of Shows, parsed from api response
 */
export interface Shows {
    shows: Show[];
}

/**
 * A less-detailed version of an tv show
 */
export interface Show {
    _id: string;
    imdb_id: string;
    tvdb_id: string;
    title: string;
    year: string;
    slug: string;
    rating: Rating;
    num_seasons: number;
    images: Images;
}

interface Images {
    poster: string;
    fanart: string;
    banner: string;
}

interface Rating {
    percentage: number;
    watching: number;
    votes: number;
    loved: number;
    hated: number;
}