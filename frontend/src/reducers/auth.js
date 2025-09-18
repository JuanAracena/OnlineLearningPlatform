import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from "../actions/types";

const initialState = {
    isAuthenticated: null,
    error: null

};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload
            }

        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: payload
            }

        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                error: null
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                error: null
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                error: null
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                error: null
            };
        
        case REGISTER_FAIL:
            return state;

        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                error: payload
            }

        case LOGOUT_FAIL:
            return state;

        case DELETE_USER_FAIL:
            return state;
        
        default:
            return state;
            
    };
}