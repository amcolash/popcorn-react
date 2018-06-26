import axios from 'axios';

import Movie from '../Defs/Movie';
import Query from '../Defs/Query';

// TODO: This will hold the query and run searches
export default class Popcorn {
    public static query : Query;
    public static movies : Movie[];
    public static isLoaded : boolean = false;
    public static isSearching : boolean = false;

    // totalPages: totalPages;
    // totalMovies: total;

    // ^^^ All of this is getting to be a bit much for the state, maybe pull into a separate static state class?

    private readonly endpoint : string = 'https://yts.am/api/v2/list_movies.json?';

    public updateData() {
        Popcorn.isSearching = true;

        axios.get(this.endpoint + Popcorn.query.constructQuery()).then(response => {
            const movies = response.data.data.movies;
            Popcorn.movies = movies.map(movie => new Movie(movie));

            // const total = data.movie_count;
            // const totalPages = Math.ceil(total / limit);
            // totalPages: totalPages,
            // totalMovies: total

            Popcorn.isLoaded = true;
            Popcorn.isSearching = false;
        }, error => {
            console.error(error);

            Popcorn.isLoaded = true;
            Popcorn.isSearching = false;
        });
    }

    public changePage(direction : number) {
        let newPage = direction + Popcorn.query.page;
        
        if (newPage === Popcorn.query.page) {
            return;
        } else if (newPage < 1) {
            newPage = 1;
        }
        
        // TODO: We can't do this anymore...
        // if (newPage > totalPages) newPage = totalPages;

        Popcorn.query.page = newPage;
        this.updateData();
    }
}