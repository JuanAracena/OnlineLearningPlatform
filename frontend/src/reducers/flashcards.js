import { 
    FLASHCARD_CREATION_SUCCESS,
    FLASHCARD_CREATION_FAIL,
    LOAD_FLASHCARDS_SUCCESS,
    LOAD_FLASHCARDS_FAIL,
    FLASHCARD_DELETION_SUCCESS,
    FLASHCARD_DELETION_FAIL,
    FLASHCARD_UPDATE_SUCCESS,
    FLASHCARD_UPDATE_FAIL
} from "../actions/types";

const initialState = {
    flashcards: [],
    error: null

};

export default function(state = initialState, action) {
    
    const { type, payload } = action;

    switch(type) {

        case FLASHCARD_UPDATE_SUCCESS:
            return {
                ...state,
                flashcards: state.flashcards.map(f => f.f_id === payload.f_id ? payload : f),
                error: null
            };
        
        case FLASHCARD_UPDATE_FAIL:
            return {
                ...state,
                error: payload
            };

        case FLASHCARD_DELETION_SUCCESS:
            return {
                ...state,
                flashcards: state.flashcards.filter(f => f.f_id !== payload),
                error: null
            };

        case FLASHCARD_DELETION_FAIL:
             return {
                ...state,
                error: payload
            };
        
        case LOAD_FLASHCARDS_SUCCESS:
            return {
                ...state,
                flashcards: payload,
                error: null
            };
        
        case LOAD_FLASHCARDS_FAIL:
            return {
                ...state,
                flashcards: [],
                error: payload
            };

        case FLASHCARD_CREATION_SUCCESS:
            return {
                ...state,
                flashcards: [...state.flashcards, payload],
                error: null
            };
        
        case FLASHCARD_CREATION_FAIL:
            return {
                ...state,
                error: payload
            };
        
        default:
            return state;
    }
}