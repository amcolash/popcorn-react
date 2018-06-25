import Genre from './Genre';
import Sort from './Sort';
import { Type } from './Type';

export default class Query {
    public keywords : string;
    public type : Type;
    public genre : string;
    public sort : string;
    public page : number;

    private readonly ENDPOINT : string = "https://tv-v2.api-fetch.website/";

    constructor(keywords : string) {
        this.reset();
        this.keywords = keywords;
    }

    public constructQuery() : string {
        let url : string = this.ENDPOINT;
        url += Type[this.type] + "/";
        url += this.page + "?";
        url += "keywords=" + this.keywords + "&";
        url += "sort=" + this.sort + "&";
        url += "order=" + ((this.sort === "Name" || this.sort === "Title") ? "Ascending" : "Descending") + "&";

        if (this.genre !== "All") {
            url += "genre=" + this.genre + "&";
        }

        return url;
    }

    public reset() {
        this.keywords = '';
        this.type = Type.Movie;
        this.genre = Genre.getDefaultGenre(this.type);
        this.sort = Sort.getDefaultSort(this.type);
        this.page = 1;
    }
}