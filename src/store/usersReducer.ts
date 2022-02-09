import { UserAction } from './ActionCreators';
import * as actionTypes from './ActionTypes';
import { User } from '../services/proexe/types';

export type Users = {
    users: User[];
};

const initialState: Users = {
    users: [],
};

export const usersReducer = (state: Users = initialState, action: UserAction) => {
    switch(action.type){
        case actionTypes.EDIT_USER: {
            const editedUser = action.payload as User;
            return {...state, users: state.users.map(user => user.id !== editedUser.id ? user : editedUser)}
        }
        case actionTypes.ADD_USER: {
            return {...state, users: [...state.users, action.payload as User]}
        }
        case actionTypes.DELETE_USER: {
            const filteredUsers = state.users.filter(user => user.id !== action.payload)
            return {...state, users: filteredUsers}
        }
        case actionTypes.SORT_USERS: {
            const rawUsers = [...state.users];
            const sortIndex = action.payload as number;
            return {...state, users: rawUsers.sort((user1, user2) => user1.username > user2.username ? -sortIndex : sortIndex)}
        }
        case actionTypes.ADD_USERS: {
            return {...state, users: action.payload as User[]}
        }
        default:
            return state
    }
}