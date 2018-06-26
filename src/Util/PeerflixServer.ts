import axios from 'axios';

import keys from '../Util/Keys';

import Torrent from './Torrent';
import Version from './Version';

export default class PeerflixServer {
    // TODO: Finsih this up
    public static torrents : Torrent[];
    public static started : string[];
    public static storage : string;
    public static location : string;

    public readonly server = "http://" + window.location.hostname + ":9000";

    public updateTorrents() {
        axios.get(this.server + '/torrents').then(response => {
            const torrents = response.data;
            PeerflixServer.started = PeerflixServer.started.filter(infoHash => {
                for (let torrent of torrents) {
                    if (torrent.infoHash === infoHash) {
                        return false;
                    }
                }
                return true;
            });

            for (let torrent of torrents) {
                if (torrent.progress && torrent.progress[0] === 100 && !torrent.halted) {
                    console.log("stopping complete torrent: " + torrent.infoHash);
                    axios.post(this.server + '/torrents/' + torrent.infoHash + '/halt').then(response => {
                        this.updateTorrents();
                    }, error => {
                        console.error(error);
                    });
                }
            }
        }, error => {
            console.error(error);
        });
    }

    public updateStorage() {
        axios.get(this.server + '/storage').then(response => {
            PeerflixServer.storage = response.data.used;
        }, error => {
            console.error(error);
        });
    }

    public updateLocation() {
        // If the server is not patched or something goes wrong, no worries
        axios.get(this.server + '/ip').then(ip => {
            axios.get('https://api.ipdata.co/' + ip.data + "?api-key=" + keys.ipdata).then(response => {
                PeerflixServer.location = response.data.city + ', ' + response.data.country_name;
            }, error => {
                console.error(error);
            });
        }, error => {
            console.error(error);
        });
    }

    public getInfoHash(data : Torrent | Version | string) : string {
        if (data instanceof Torrent) {
            return data.infoHash;
        } else if (data instanceof Version) {
            return data.infoHash;
        } else {
            return data;
        }
    }

    public downloadTorrent(version: Version) {
        PeerflixServer.started = [...PeerflixServer.started, version.infoHash];

        axios.post(this.server + '/torrents', { link: version.url }).then(response => {
            this.updateTorrents();
        }, error => {
            console.error(error);
        });
    }

    public cancelTorrent(data : Torrent | string) {
        const infoHash = this.getInfoHash(data);

        axios.delete(this.server + '/torrents/' + infoHash).then(response => {
            this.updateTorrents();
        }, error => {
            console.error(error);
        });
    }

    public stopTorrent(data : Torrent | string) {
        const infoHash = this.getInfoHash(data);

        axios.post(this.server + '/torrents/' + infoHash + '/stop').then(response => {
            this.updateTorrents();
        }, error => {
            console.error(error);
        });
    }

    public getTorrent(infoHash : string) : Torrent | null {
        for (let torrent of PeerflixServer.torrents) {
            if (torrent.infoHash === infoHash) {
                return torrent;
            }
        }

        return null;
    }

    public getProgress(data : Torrent | Version | string) : number | null {
        let torrent;
        if (data instanceof Version || typeof data === "string") {
            const infoHash = this.getInfoHash(data);
            torrent = this.getTorrent(infoHash);
        } else {
            torrent = data;
        }

        return (torrent !== null && torrent.progress && torrent.progress[0]) ? torrent.progress[0] + 0.001 : null;
    }

    public getLink(data : Torrent | string) {
        const infoHash = this.getInfoHash(data);

        for (let torrent of PeerflixServer.torrents) {
            if (torrent.infoHash === infoHash) {
                let largestSize = 0;
                let largestIndex = 0;

                for (let j = 0; j < torrent.files.length; j++) {
                    const file = torrent.files[j];
                    if (file.length > largestSize) {
                        largestIndex = j;
                        largestSize = file.length;
                    }
                }

                return this.server + torrent.files[largestIndex].link;
            }
        }
    }
}