import { LoadingAction } from './ActionCreators';
import * as actionTypes from './ActionTypes';

export interface Loading {
    loading: boolean;
    apiDataLoaded: boolean;
};

const initialState = {
    loading: false,
    apiDataLoaded: false,
};

export const loadingReducer = (state: Loading = initialState, action: LoadingAction) => {
    switch(action.type){
        case actionTypes.UPDATE_LOADING: {
            return {...state, loading: action.payload};
        }
        case actionTypes.UPDATE_API_LOADED: {
            return {...state, apiDataLoaded: action.payload};
        }
        default:
            return state
    }
}