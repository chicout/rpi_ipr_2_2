export const SET_NEWS = 'SET_NEWS';
export const SET_SOURCES = 'SET_SOURCES';
export const SET_CURRENT_SOURCE = 'SET_CURRENT_SOURCE';
export const SET_CURRENT_QUERY = 'SET_CURRENT_QUERY';
export const RESET = 'RESET';

class Actions {
    setNews = data => {
        return dispatch => {
            dispatch({
                type: SET_NEWS,
                data
            });
        };
    };

    setSources = data => {
        return dispatch => {
            dispatch({
                type: SET_SOURCES,
                data
            });
        };
    };

    setCurrentSource = data => {
        return dispatch => {
            dispatch({
                type: SET_CURRENT_SOURCE,
                data
            });
        };
    };

    setCurrentQuery = data => {
        return dispatch => {
            dispatch({
                type: SET_CURRENT_QUERY,
                data
            });
        };
    };

    reset = () => {
        return dispatch => {
            dispatch({
                type: RESET
            });
        };
    };
}

export default new Actions();