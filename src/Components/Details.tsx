import axios from 'axios';
import * as React from 'react';
import { FaDownload, FaPlayCircle } from 'react-icons/lib/fa';

import keys from '../Util/Keys';

import Movie from '../Defs/Movie';
import Version from '../Defs/Version';

import './Details.css';

import Progress from './Progress';
import Spinner from './Spinner';
import PeerflixServer from '../Util/PeerflixServer';

interface IDetailsProps {
    movie : Movie;
}

interface IDetailsState {
    moreData : any;
}

class Details extends React.Component<IDetailsProps, IDetailsState> {

    constructor(props : IDetailsProps) {
        super(props);
        this.state = { moreData: null };
    }

    public componentDidMount() {
        axios.get('http://www.omdbapi.com/?apikey=' + keys.omdb + '&i=' + this.props.movie.imdb, { timeout: 10000 }).then(response => {
            this.setState({ moreData: response.data });
        }, error => {
            console.error(error);
            this.setState({ moreData: "ERROR" });
        });
    }

    public render() {
        const movie = this.props.movie;
        const moreData = this.state.moreData;

        const versions : Version[] = movie.versions;

        return (
            <div className="container">
                <div className="left">
                    <img src={movie.cover} alt={movie.title}/>
                    {movie.trailer ? (
                        <React.Fragment>
                            <br/>
                            <a href={'https://www.youtube.com/watch?v=' + movie.trailer} target="_blank"><FaPlayCircle />Trailer</a>
                        </React.Fragment>
                    ) : null}
                </div>
                <div className="right">
                    <h4>
                        {movie.year}, {movie.duration}
                        <div className="mpaa-rating">{movie.mpaa}</div>
                    </h4>
                    <p>{movie.description}</p>
                    <span>
                        {movie.genres.length === 1 ? "Genre": "Genres"}: {JSON.stringify(movie.genres).replace(/[[\]"]/g, '').replace(/,/g, ', ')}
                    </span>
                    <br/>
                    <br/>
                    <a href={"https://www.imdb.com/title/" + movie.imdb} target="_blank">IMDB Rating</a><span>: {movie.rating} / 10</span>
                    
                    {(moreData !== null && moreData !== "ERROR") ? (
                        <React.Fragment>
                            <br/>
                            {moreData.Ratings.map(rating => (
                                <React.Fragment key={rating.Source}>
                                    {rating.Source !== "Internet Movie Database" ? (
                                        <React.Fragment>
                                            <span>{rating.Source}: {rating.Value}</span>
                                            <br />
                                        </React.Fragment>
                                    ) : null}
                                </React.Fragment>
                            ))}
                            <hr/>
                            <span>{moreData.Director.indexOf(",") !== -1 ? "Directors" : "Director"}: {moreData.Director}</span>
                            <br/>
                            <span>{moreData.Writer.indexOf(",") !== -1 ? "Writers" : "Writer"}: {moreData.Writer}</span>
                            <br/>
                            <span>Actors: {moreData.Actors}</span>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {moreData === "ERROR" ? (
                                null
                            ) : (
                                <React.Fragment>
                                    <hr/>
                                    <span>
                                        Loading additional data...
                                        <Spinner visible={true}/>
                                    </span>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}

                    <hr/>

                    {versions.map(version => (
                        <div className="version" key={version.url}>
                            <b>{version.quality}</b>
                            {PeerflixServer.getProgress(version.infoHash) ? null : (
                                <button className="orange download" onClick={() => PeerflixServer.downloadTorrent(version)}>
                                    {PeerflixServer.started.indexOf(version.infoHash) !== -1 ? (
                                        <Spinner visible={true} noMargin={true} button={true} />
                                    ) : (
                                        <FaDownload/>
                                    )}
                                </button>
                            )}
                            <span> {version.size}, (Peers: {version.peers}, Seeds: {version.seeds}, Ratio: {version.ratio})</span>
                            <br/>
                            {PeerflixServer.getProgress(version.infoHash) ? (
                                <Progress
                                    torrent={PeerflixServer.getTorrent(version.infoHash)}
                                    fullName={true}
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Details;