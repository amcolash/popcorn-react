import Version from './Version';

export default class Movie {

    public title : string;
    public description : string;
    public year : number;
    public duration : number;
    public mpaa : string;
    public imdb : string;
    public cover : string;
    public genres : string[];
    public versions : Version[];

    constructor(data : any) {
        // TODO: Use real data here

        if (data.torrents) {
            for (let torrentInfo of data.torrents) {
                const version = new Version();

                version.quality = torrentInfo.quality;
                version.peers = parseFloat(torrentInfo.peers.toFixed(0));
                version.seeds = parseFloat(torrentInfo.seeds.toFixed(0));
                version.ratio = torrentInfo.peers > 0 ? parseFloat((torrentInfo.seeds / torrentInfo.peers).toFixed(3)) : 0;
                version.url = torrentInfo.url;
                version.infoHash = torrentInfo.hash.toLowerCase();
                version.size = parseFloat(torrentInfo.size);

                if (!this.versions[version.quality] || this.versions[version.quality].ratio < version.ratio) {
                    this.versions[version.quality] = version;
                }
            }
        }
    }

    private convertTime(min: number): string {
        const hours = Math.floor(min / 60);
        const minutes = Math.floor(((min / 60) - hours) * 60);

        return (hours > 0 ? hours + "h " : "") + (minutes > 0 ? minutes + "m" : "");
    }
}