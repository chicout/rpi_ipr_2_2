import React, { Component, Fragment } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchBoxComponent from '../components/search-box.component';
import ListComponent from '../components/list.component';
import api from '../api';
import actions from '../actions';

import './list.css';

class List extends Component {
    #search = null;

    constructor(props) {
        super(props);

        this.state = {
            canLoadData: true,
            showNoItems: false
        };
    }

    async componentDidMount() {
        await api.getSources();
        this.#getNews();
    }

    async onSearchChange() {
        const {actions} = this.props;

        await actions.reset();
        await actions.setCurrentQuery(this.#search.value);

        this.#getNews();
    }

    async onFilterChange(event) {
        const {actions} = this.props;

        await actions.reset();
        await actions.setCurrentSource(event.target.value);
        this.#cleanSearch();

        this.#getNews();
    };

    async onMoreBtnClick() {
        if (!this.props.canLoadData) { return; }
        this.#getNews();
    }

    render() {
        const {sources, news} = this.props,
              {canLoadData, showNoItems} = this.state;
        return (
            <Fragment>
                <main>
                    <div className="list-search-box-container">
                        <SearchBoxComponent
                            searchRef={element => this.#search = element}
                            sources={sources}
                            onFilterChange={event => this.onFilterChange(event)}
                            onSearchChange={() => this.onSearchChange()}
                        />
                    </div>
                    <div className="list-no-item-container" hidden={!showNoItems}>
                        <p>There are no articles matching your request.</p>
                    </div>
                    <ListComponent news={news} />
                </main>
                <footer>
                    <button
                        type="button"
                        hidden={!canLoadData}
                        onClick={() => this.onMoreBtnClick()}>Load More
                    </button>
                </footer>
            </Fragment>
        );
    }

    #cleanSearch() {
        this.#search.value = '';
    }

    async #getNews() {
        const {currentPage: page, currentSource: sources, currentQuery: q} = this.props;
        await api.getNews({page, sources, q});

        const {news} = this.props,
              newsLength = news.length;
        this.setState({
            canLoadData: newsLength && newsLength <= 35,
            showNoItems: !newsLength
        });
    }
}


const mapStateToProp = state => ({...state.list});
const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

export default compose(connect(mapStateToProp, mapDispatchToProps))(List);