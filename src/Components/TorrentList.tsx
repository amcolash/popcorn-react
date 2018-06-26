import * as React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import Query from '../Defs/Query';
import Torrent from '../Defs/Torrent';
import Progress from './Progress';

interface ITorrentListProps {
    getLink : ((query : Query) => string);
    cancelTorrent : ((torrent : Torrent) => void);
    torrents : Torrent[];
}

interface ITorrentListState {
    collapsed : boolean;
}

class TorrentList extends React.Component<ITorrentListProps, ITorrentListState> {
    constructor(props : ITorrentListProps) {
        super(props);

        this.state = { collapsed: true };
    }

    public render() {
        const { getLink, cancelTorrent, torrents } = this.props;

        if (torrents.length === 0) {
            return null;
        }

        return (
            <div className="torrentList">
                <h3>
                    <span>Downloads ({torrents.length})</span>
                    <button onClick={this.toggleCollapse}>
                        {this.state.collapsed ? <FaPlus/> : <FaMinus/>}
                    </button>
                </h3>

                {!this.state.collapsed ? (
                    <div>
                        {(torrents.map(torrent => (
                            <Progress
                                key={torrent.infoHash}
                                torrent={torrent}
                                getLink={getLink}
                                cancelTorrent={cancelTorrent}
                                fullName={false}
                            />
                        )))}
                    </div>
                ) : null}
                <hr/>
            </div>
        );
    }

    private expand() {
        this.setState({ collapsed: false });
    }

    private collapse() {
        this.setState({ collapsed: true });
    }

    private toggleCollapse() {
        this.setState({ collapsed: !this.state.collapsed });
    }
}

export default TorrentList;