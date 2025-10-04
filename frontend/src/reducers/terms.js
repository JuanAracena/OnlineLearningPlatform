import {
    LOAD_TERMS_SUCCESS,
    LOAD_TERMS_FAIL,
    TERM_CREATION_SUCCESS,
    TERM_CREATION_FAIL,
    TERM_DELETION_FAIL,
    TERM_DELETION_SUCCESS,
    TERM_UPDATE_SUCCESS,
    TERM_UPDATE_FAIL
} from "../actions/types";

const initialState = {
    terms: [],
    error: null
};

export default function(state = initialState, action) {

    const { type, payload } = action;

    switch(type){

        case TERM_UPDATE_SUCCESS:
            return {
                ...state,
                terms: state.terms.map(t => t.t_id === payload.t_id ? payload : t),
                error: null
            };
        
        case TERM_UPDATE_FAIL:
            return {
                ...state,
                error: payload
            };

        case TERM_DELETION_SUCCESS:
            return {
                ...state,
                terms: state.terms.filter(t => t.t_id !== payload),
                error: null
            };

        case TERM_DELETION_FAIL:
            return {
                ...state,
                error: payload
            };

        case TERM_CREATION_SUCCESS:
            return {
                ...state,
                terms: [...state.terms, payload],
                error: null
            };
        
        case TERM_CREATION_FAIL:
            return {
                ...state,
                error: payload
            };

        case LOAD_TERMS_SUCCESS:
            return {
                ...state,
                terms: payload,
                error: null
            }

        case LOAD_TERMS_FAIL:
            return {
                ...state,
                terms: [],
                error: payload
            }

        default:
            return state;
    }
        

}