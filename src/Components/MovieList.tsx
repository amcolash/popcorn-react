import * as React from 'react';
import Modal from 'react-responsive-modal';
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaAngleRight, FaAngleLeft, FaClose, FaExclamationTriangle } from 'react-icons/fa';

import './MovieList.css';

import PeerflixServer from '../Util/PeerflixServer';
import Popcorn from '../Util/Popcorn';

import Details from './Details';
import Movie from './MovieCover';
import Search from './Search';
import Spinner from './Spinner';
import TorrentList from './TorrentList';

class MovieList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            movies: [],
            totalMovies: 0,
            page: 1,
            totalPages: 1,
            modal: false,
            movie: {},
            search: '',
            genre: '',
            quality: 'All',
            order: 'date_added',
            isSearching: false,
            width: 0,
            height: 0
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    componentDidMount() {
        this.updateData();
        
        this.updateLocation();
        
        // First update, then schedule polling
        this.updateTorrents();
        setInterval(() => this.updateTorrents(), 5000); // Poll torrents every 5 seconds (might be overkill)

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    onOpenModal = (movie) => {
        this.setState({ movie: movie, modal: true });
    };

    onCloseModal = () => {
        this.setState({ modal: false });
    };

    render() {
        const { isLoaded, movies, modal, movie, page, totalPages, totalMovies, width } = this.state;

        if (!isLoaded) {
            return (
            <div className="message">
                <span>Loading...</span>
                <Spinner visible={true}/>
            </div>
            );
        } else {
            return (
                <React.Fragment>
                    <Modal open={modal} onClose={this.onCloseModal} center={width > 800}>
                        <Details
                            movie={movie}
                        />
                    </Modal>
            
                    {location === "Seattle, United States" ? (
                        <span className="warning red">
                            <FaExclamationTriangle/>
                            <span>Server not secure</span>
                        </span>
                    ) : null}

                    <TorrentList />

                    <Search />

                    <h2>{totalMovies} Movies</h2>

                    <div className="movie-list">
                        {(movies && movies.length > 0) ? (
                            movies.map(movie => (
                                movie.torrents ? (
                                    <Movie
                                        key={movie.id}
                                        movie={movie}
                                        click={this.onOpenModal}
                                    />
                                ) : null
                            ))
                        ) :
                            <div className="message">No Results</div>
                        }
                    </div>

                    {(movies && movies.length > 0) ? (
                        <div className="pager">
                            <FaAngleDoubleLeft
                                className="arrow"
                                style={{ visibility: page > 1 ? "visible" : "hidden" }}
                                onClick={() => Popcorn.changePage(-5)}
                            />
                            <FaAngleLeft
                                className="arrow"
                                style={{ visibility: page > 1 ? "visible" : "hidden" }}
                                onClick={() => Popcorn.changePage(-1)}
                            />
                            <span>{page}</span>
                            <FaAngleRight
                                className="arrow"
                                style={{ visibility: page < totalPages ? "visible" : "hidden" }}
                                onClick={() => Popcorn.changePage(1)}
                            />
                            <FaAngleDoubleRight
                                className="arrow"
                                style={{ visibility: page < totalPages ? "visible" : "hidden" }}
                                onClick={() => Popcorn.changePage(5)}
                            />

                            <br/>
                            
                            <Spinner visible={Popcorn.isSearching} noMargin />

                            <div className="footer">
                                {location ? (
                                    <React.Fragment>
                                        <br/>
                                        <br/>
                                        <span className="location">Server Location: {location}</span>
                                    </React.Fragment>
                                ) : null}
                                <br/>
                                <br/>
                                {PeerflixServer.storage ? (
                                    <React.Fragment>
                                        <span>Disk Usage: {PeerflixServer.storage}%</span>
                                        <progress value={PeerflixServer.storage} max="100"/>
                                    </React.Fragment>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                </React.Fragment>
            );
        }
    }
}

export default MovieList;