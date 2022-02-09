import { StatesAction } from './ActionCreators';
import * as actionTypes from './ActionTypes';

export interface States {
    loading: boolean;
    apiDataLoaded: boolean;
    sortingIndex: number;
};

const initialState = {
    loading: false,
    apiDataLoaded: false,
    sortingIndex: 0,
};

export const statesReducer = (state: States = initialState, action: StatesAction): States => {
    switch(action.type){
        case actionTypes.UPDATE_LOADING: {
            return {...state, loading: action.payload as boolean};
        }
        case actionTypes.UPDATE_API_LOADED: {
            return {...state, apiDataLoaded: action.payload as boolean};
        }
        case actionTypes.SORT_USERS: {
            return {...state, sortingIndex: action.payload as number};
        }
        default:
            return state
    }
}