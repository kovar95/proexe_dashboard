import { User } from '../services/proexe/types';
import * as actionTypes from './ActionTypes';

export type UserAction = {type: string, payload: User | User[] | number};
export type ErrorAction = {type: string, payload: string | null};
export type LoadingAction = {type: string, payload: boolean};


export const editUser = (user: User): UserAction => ({
    type: actionTypes.EDIT_USER,
    payload:user, 
});

export const addUser = (user: User): UserAction => ({
    type: actionTypes.ADD_USER,
    payload:user, 
})

export const deleteUser = (id: number): UserAction => ({
    type: actionTypes.DELETE_USER,
    payload:id, 
})

export const addAllUsers = (users: User[]): UserAction => ({
    type: actionTypes.ADD_USERS,
    payload:users, 
});

export const updateErrors = (error: string | null): ErrorAction => ({
    type: actionTypes.UPDATE_ERRORS,
    payload:error, 
});

export const updateLoadingState = (loadingState: boolean): LoadingAction => ({
    type: actionTypes.UPDATE_LOADING,
    payload: loadingState, 
});

export const updateApiDataLoaded = (apiDataLoaded: boolean): LoadingAction => ({
    type: actionTypes.UPDATE_API_LOADED,
    payload: apiDataLoaded, 
});

export const sortUsers = (sortIndex: number): UserAction => ({
    type: actionTypes.SORT_USERS,
    payload: sortIndex, 
});


