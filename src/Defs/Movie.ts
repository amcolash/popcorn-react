import Version from './Version';

export default class Movie {

    public title : string;
    public description : string;
    public year : number;
    public duration : number;
    public mpaa : string;
    public imdb : string;
    public cover : string;
    public trailer : string;
    public rating : number;
    public genres : string[];
    public versions : Version[];

    constructor(data : any) {
        // TODO: Use real data here
        this.title = data.title;
        this.description = data.summary;
        this.year = data.year;
        this.duration = data.runtime;
        this.mpaa = data.mpa_rating;
        this.imdb = data.imdb_code;
        this.cover = data.medium_cover_image;
        this.trailer = data.yt_trailer_code;
        this.rating = data.rating;
        this.genres = data.genres;

        if (data.torrents) {

            for (const torrentInfo of data.torrents) {
                const version = new Version();

                // version.quality = torrentInfo.quality;
                // version.peers = parseFloat(torrentInfo.peers.toFixed(0));
                // version.seeds = parseFloat(torrentInfo.seeds.toFixed(0));
                // version.ratio = torrentInfo.peers > 0 ? parseFloat((torrentInfo.seeds / torrentInfo.peers).toFixed(3)) : 0;
                // version.url = torrentInfo.url;
                // version.infoHash = torrentInfo.hash.toLowerCase();
                // version.size = parseFloat(torrentInfo.size);

                // if (!this.versions[version.quality] || this.versions[version.quality].ratio < version.ratio) {
                //     this.versions[version.quality] = version;
                // }
            }
        }
    }

    private convertTime(duration : number): string {
        const hours = Math.floor(duration / 60);
        const minutes = Math.floor(((duration / 60) - hours) * 60);

        return (hours > 0 ? hours + "h " : "") + (minutes > 0 ? minutes + "m" : "");
    }
}