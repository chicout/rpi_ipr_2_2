import { combineReducers } from 'redux';

import {
    SET_NEWS,
    SET_SOURCES,
    SET_CURRENT_SOURCE,
    SET_CURRENT_QUERY,
    RESET
} from './actions';

const initialState = {
    currentPage: 1,
    news: [],
    sources: [],
    currentSource: null,
    currentQuery: null,
    canLoadData: true
};

const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

function list(state = initialState, action) {
    switch (action.type) {
        case SET_NEWS:
            action.data.forEach(news => news.id = guid());

            return {
                ...state,
                currentPage: state.currentPage + 1,
                news: state.news.concat(action.data)
            };
        case SET_SOURCES:
            return {
                ...state,
                sources: action.data,
                currentSource: action.data.length ? action.data[0].id : null
            };
        case SET_CURRENT_SOURCE:
            return {
                ...state,
                currentSource: action.data
            };
        case SET_CURRENT_QUERY:
            return {
                ...state,
                currentQuery: action.data
            };
        case RESET:
            return {
                ...state,
                currentPage: 1,
                newsChunk: [],
                news: [],
                currentQuery: null,
                canLoadData: true
            };
        default:
            return state;
    }
}

export default combineReducers({list});
