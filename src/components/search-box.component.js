import React, { Fragment } from 'react';

const SearchBoxComponent = props => {
    const {searchRef, onSearchChange, onFilterChange, sources} = props;
    return (
        <Fragment>
            <div>
                <input type="text" ref={searchRef}/>
                <button type="button" onClick={onSearchChange}>Search for news</button>
            </div>
            <select name="filter" onChange={onFilterChange}>
                {sources.map(source => <option key={source.id} value={source.id}>{source.name}</option>)}
            </select>
        </Fragment>
    );
};

export default SearchBoxComponent;