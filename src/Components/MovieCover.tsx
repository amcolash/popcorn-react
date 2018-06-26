import * as React from 'react';
import { FaDownload, FaTrash } from 'react-icons/fa';

import './Movie.css';
import Spinner from './Spinner';

import Movie from '../Defs/Movie';
import Version from '../Defs/Version';

interface IMovieCoverProps {
    openModal : (movie : Movie) => void;
    movie : Movie;
    downloadTorrent : (version : Version) => void;
    cancelTorrent : (version : Version) => void;
    getProgress : (version : Version) => number;
    started : string[];
}

class MovieCover extends React.Component<IMovieCoverProps, {}> {
    public render() {
        const { openModal, movie, downloadTorrent, cancelTorrent, getProgress, started } = this.props;
        
        const versions : Version[] = movie.versions;
        for (let version of movie.versions) {
            version.progress = getProgress(version);
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
                                        cancelTorrent(version);
                                    }}><FaTrash/></button>
                                ) : (
                                    <button className="orange download" onClick={(e) => {
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                        downloadTorrent(version);
                                    }}>
                                        {started.indexOf(version.infoHash) !== -1 ? (
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