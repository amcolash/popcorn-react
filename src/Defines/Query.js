export default class Query {
    constructor(keyword, genre, order, quality, page, type) {
        this.keyword = keyword;
        this.genre = genre;
        this.order = order;
        this.quality = quality;
        this.page = page;
        this.type = type;
    }
}