import * as React from 'react';
import './App.css';

import Search from './Components/Search';
import Query from './Defs/Query';
import Popcorn from './Util/Popcorn';
import MovieCover from './Components/MovieCover';

class App extends React.Component {
  private query : Query = Popcorn.query;

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Search query={this.query} />

        <h3>Movies ({Popcorn.movies ? Popcorn.movies.length : null})</h3>

        <div className="movie-list">
          {(Popcorn.movies && Popcorn.movies.length > 0) ? (
            Popcorn.movies.map(movie => (
              movie.versions ? (
                <MovieCover
                  movie={movie}
                  openModal={() : void => {return;} }
                />
              ) : null
            ))
          ) :
            <div className="message">No Results</div>
          }
        </div>
      </div>
    );
  }
}

export default App;
