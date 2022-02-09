import { ErrorAction } from './ActionCreators';
import * as actionTypes from './ActionTypes';

export interface ErrorState {
    error: string | null;
};

const initialState = {
    error: null,
};

export const errorReducer = (state: ErrorState = initialState, action: ErrorAction) => {
    switch(action.type){
        case actionTypes.UPDATE_ERRORS: {
            return {...state, error: action.payload}
        }
        default:
            return state
    }
}