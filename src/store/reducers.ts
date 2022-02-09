import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { errorReducer } from './errorReducer';
import { usersReducer } from './usersReducer';
import { loadingReducer } from './loadingReducer';

const rootReducer =  combineReducers({
    errorReducer,
    usersReducer,
    loadingReducer,
})

const store = createStore(rootReducer, composeWithDevTools());

export type IRootState = ReturnType<typeof rootReducer>
export default store;
