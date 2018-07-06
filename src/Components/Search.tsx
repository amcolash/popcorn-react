import * as React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { FaClose } from 'react-icons/lib/fa';

import Spinner from './Spinner';

import Genre from '../Defs/Genre';
import Query from '../Defs/Query';
import Sort from '../Defs/Sort';
import { Type } from '../Defs/Type';
import Popcorn from '../Util/Popcorn';

interface ISearchProps {
    query : Query
}

class Search extends React.Component<ISearchProps, {}> {

    public render() {
        const query = this.props.query;
        
        const clearVisible =
            query.keywords.length > 0 ||
            query.genre.length > 0 ||
            query.sort !== Sort.getDefaultSort(query.type) ||
            query.page !== 1;

        return (
            < div className="search" >
                <label>
                    <div className="searchItem">
                        <span>Search</span>
                        <DebounceInput
                            value={query.keywords}
                            debounceTimeout={500}
                            onChange={this.updateKeywords}
                        />
                    </div>

                    <div className="searchItem">
                        <span>Genre</span>
                        <select
                            onChange={this.updateGenre}
                            value={query.genre}
                        >
                            {Genre.getGenres(query.type).map(genre => (
                                <option
                                    key={genre}
                                    value={query.type === Type.Anime ? genre : genre.toLocaleLowerCase()}
                                >
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="searchItem">
                        <span>Sort</span>
                        <select
                            onChange={this.updateSort}
                            value={query.sort}
                        >
                            {Sort.getSort(query.type).map(sort => (
                                <option key={sort} value={sort}>
                                    {sort}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="red" style={{display: clearVisible ? "inline" : "none"}} onClick={this.resetQuery}><FaClose /></button>
                </label>

                <Spinner visible={Popcorn.isSearching} />
            </div >
        );
    }

    private updateKeywords = (element : React.ChangeEvent<HTMLInputElement>) => {
        this.props.query.keywords = element.target.value;
        Popcorn.updateData();
    }

    private updateGenre = (element : React.FormEvent<HTMLSelectElement>) => {
        this.props.query.genre = element.currentTarget.value;
        Popcorn.updateData();
    }

    private updateSort = (element : React.FormEvent<HTMLSelectElement>) => {
        this.props.query.sort = element.currentTarget.value;
        Popcorn.updateData();
    }

    private resetQuery() {
        this.props.query.reset();
    }
}

export default Search;