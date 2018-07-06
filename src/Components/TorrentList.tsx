import * as React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import Torrent from '../Defs/Torrent';

import Progress from './Progress';
import PeerflixServer from '../Util/PeerflixServer';

interface ITorrentListState {
    collapsed : boolean;
}

class TorrentList extends React.Component<{}, ITorrentListState> {
    constructor(props : {}) {
        super(props);

        this.state = { collapsed: true };
    }

    public render() {
        if (PeerflixServer.torrents.length === 0) {
            return null;
        }

        return (
            <div className="torrentList">
                <h3>
                    <span>Downloads ({PeerflixServer.torrents.length})</span>
                    <button onClick={this.toggleCollapse}>
                        {this.state.collapsed ? <FaPlus/> : <FaMinus/>}
                    </button>
                </h3>

                {!this.state.collapsed ? (
                    <div>
                        {(PeerflixServer.torrents.map(torrent => (
                            <Progress
                                key={torrent.infoHash}
                                torrent={torrent}
                                fullName={false}
                            />
                        )))}
                    </div>
                ) : null}
                <hr/>
            </div>
        );
    }

    private toggleCollapse() {
        this.setState({ collapsed: !this.state.collapsed });
    }
}

export default TorrentList;