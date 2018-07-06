import axios, { AxiosPromise } from 'axios';

import Query from '../Defs/Query';
import { Type } from '../Defs/Type';

import Status from './Status';

import { Show as AnimeShowDetails } from './Anime/Details';
import { Shows as AnimeShows } from './Anime/Show';

import { Movie, Movies } from './Movie/Movie';

import { Show as TVShowDetails } from './Show/Details';
import { Shows  as TVShows } from './Show/Show';

const ENDPOINT: string = 'https://tv-v2.api-fetch.website/';

export default class PopcornWrapper {

    // I should check out this async stuff and see if it is actually sane at some point

    public static async getStatus() : Promise<Status> {
        return await this.doRequest('status');
    }

    public static async executeQuery(query : Query) : Promise<AnimeShows | Movies | TVShows> {
        return await this.doRequest(query.constructQuery());
    }

    public static async getDetails(type : Type, imdbID : string) : Promise<AnimeShowDetails | Movie | TVShowDetails> {
        switch (type) {
            case Type.Anime: return await this.doRequest('anime/' + imdbID) as AnimeShowDetails;
            case Type.Movie: return await this.doRequest('movie/' + imdbID) as Movie;
            case Type.TV: return await this.doRequest('show/' + imdbID) as TVShowDetails;
        }
    }

    private static doRequest(url : string) : any {
        axios.get(ENDPOINT + 'url').then(response => {
            return response.data;
        }, error => {
            console.error(error);
            return null;
        });
    }
    
}