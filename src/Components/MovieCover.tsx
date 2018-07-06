import * as React from 'react';
import { FaDownload, FaTrash } from 'react-icons/lib/fa';

import './Movie.css';
import Spinner from './Spinner';

import Movie from '../Defs/Movie';
import Version from '../Defs/Version';

import PeerflixServer from '../Util/PeerflixServer';

interface IMovieCoverProps {
    openModal : (movie : Movie) => void;
    movie : Movie;
}

class MovieCover extends React.Component<IMovieCoverProps, {}> {
    public render() {
        const { openModal, movie } = this.props;
        
        const versions : Version[] = movie.versions;
        for (let version of movie.versions) {
            version.progress = PeerflixServer.getProgress(version);
        }

        return (
            <div className="movie">
                <div
                    className="cover"
                    style={{ backgroundImage: "url('" + movie.cover + "')" }}
                    onClick={(e) => openModal(movie)}
                >
                    <div className="quality">
                        {versions.map(version => (
                            <React.Fragment
                                key={version.infoHash}
                            >
                                <span>{version.quality}</span>
                                {version.progress > 0 ? (
                                    <button className="red" onClick={(e) => {
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                        PeerflixServer.cancelTorrent(version.infoHash);
                                    }}><FaTrash/></button>
                                ) : (
                                    <button className="orange download" onClick={(e) => {
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                            PeerflixServer.downloadTorrent(version);
                                    }}>
                                        {PeerflixServer.started.indexOf(version.infoHash) !== -1 ? (
                                            <Spinner visible noMargin button />
                                        ) : (
                                            <FaDownload />
                                        )}
                                    </button>
                                )}
                                <br/>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <span onClick={(e) => openModal(movie)}>{movie.title} ({movie.year})</span>
            </div>
        );
    }
}

export default MovieCover;