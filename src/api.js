import fetch from 'isomorphic-fetch';

import { store } from './index';
import actions from './actions'

class Api {
    #endpoints = null;

    constructor() {
        this.#endpoints = Api.addBaseUrl({
            GET_NEWS: '/everything',
            GET_SOURCES: '/sources '
        });
    }

    getNews(params = { }) {
        const url = new URL(this.#endpoints.GET_NEWS),
            queryParams = {
                ...params,
                pageSize: 5,
                language: 'en',
                apiKey: process.env.REACT_APP_NEWS_API_KEY
            };

        for (const [key, value] of Object.entries(queryParams)) {
            if (!value) { continue; }
            url.searchParams.append(key, value);
        }

        return fetch(url)
            .then(this.#onGetResponse)
            .then((response) => this.#dispatch(actions.setNews(response ? response.articles : [])))
            .catch(this.#onError);
    }

    getSources() {
        const url = new URL(this.#endpoints.GET_SOURCES),
            queryParams = {apiKey: process.env.REACT_APP_NEWS_API_KEY};

        for (const [key, value] of Object.entries(queryParams)) {
            url.searchParams.append(key, value);
        }

        return fetch(url)
            .then(this.#onGetResponse)
            .then((response) => this.#dispatch(actions.setSources(response ? response.sources.slice(0, 5) : [])))
            .catch(this.#onError);
    }

    static addBaseUrl(endpoints) {
        for (const [key, value] of Object.entries(endpoints)) {
            endpoints[key] = `${process.env.REACT_APP_GLOBAL_PATH}/${process.env.REACT_APP_VERSION_PATH}${value}`;
        }

        return endpoints;
    }

    #onGetResponse(response) {
        return response.ok ? response.json() : null;
    }

    #onError(error) {
        console.log(error);
    }

    #dispatch(action) {
        return store.dispatch(action);
    }
}

export default new Api();