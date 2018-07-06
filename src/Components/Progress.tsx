import * as React from 'react';
import { FaTrash, FaPlay, FaExclamationCircle } from 'react-icons/fa';

import Torrent from '../Defs/Torrent';
import PeerflixServer from '../Util/PeerflixServer';

interface IProgressProps {
    torrent : Torrent | null;
    fullName : boolean;
}

class Progress extends React.Component<IProgressProps, {}> {
    
    public render() {
        const { torrent, fullName } = this.props;
        if (torrent == null) return null;

        const type = torrent.name.indexOf("720") !== -1 ? "720p" : (torrent.name.indexOf("1080") !== -1 ? "1080p" : (torrent.name.indexOf("3D") !== -1 ? "3D" : null));
        const name = (fullName || torrent.name.indexOf(")") === -1) ? torrent.name : torrent.name.substring(0, torrent.name.indexOf(")") + 1) + (type ? " [" + type + "]" : "");
        const speed : number = torrent.stats ? parseFloat((torrent.stats.speed.down / 1000000).toFixed(2)) : -1;
        const progress : number = parseFloat(torrent.progress[0].toFixed(0));
        const link = PeerflixServer.getLink(torrent);

        const data = {
            title: name,
            url: link
        }
        const playerBase = window.location.href + "player?data=";
        const playerLink = playerBase + encodeURIComponent(JSON.stringify(data));

        return (
            <div className="progress">
                <span>{name}</span>
                <progress value={progress > 1 ? progress : undefined } max="100" />
                <span>{progress}% </span>
                {torrent.stats && progress < 95 ? (
                    <span className={speed > 0.25 ? "green" : speed > 0.125 ? "orange" : "red"}>
                        {speed < 0.15 ? (
                            <FaExclamationCircle
                                style={{ paddingRight: "0.25em" }}
                            />
                        ) : null}
                        [{speed} MB/s]
                    </span>
                ) : null}
                <button className="green" onClick={() => window.open(playerLink)}><FaPlay/></button>
                <button className="red" onClick={() => PeerflixServer.cancelTorrent(torrent)}><FaTrash/></button>
            </div>
        );
    }
}

export default Progress;