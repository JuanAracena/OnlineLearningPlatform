import Cookies from "js-cookie";
import {
    LOAD_FLASHCARDS_SUCCESS,
    LOAD_FLASHCARDS_FAIL,
    FLASHCARD_CREATION_SUCCESS,
    FLASHCARD_CREATION_FAIL,
    FLASHCARD_DELETION_SUCCESS,
    FLASHCARD_DELETION_FAIL,
    FLASHCARD_UPDATE_SUCCESS,
    FLASHCARD_UPDATE_FAIL
} from "./types";


export const update_flashcard = (f_id, f_title) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    };

    const body = JSON.stringify({ f_title });


    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${f_id}/edit_flashcard`, {
            method: "PATCH",
            headers: config.headers,
            credentials: "include",
            body: body
        })

        if(res.ok) {

            const data = await res.json();

            dispatch({
                type: FLASHCARD_UPDATE_SUCCESS,
                payload: data
            })

        }else {
            const errorData = await res.json();
            dispatch({
                type: FLASHCARD_UPDATE_FAIL,
                payload: errorData.error || "Failed to update flashcard"

            })
        }


    } catch(err) {
        dispatch({
            type: FLASHCARD_UPDATE_FAIL,
            payload: "Something went wrong while updating flashcard"
        })
    }
}

export const delete_flashcard = (f_id) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    }

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${f_id}/delete_flashcard`, {
            method: "DELETE",
            headers: config.headers,
            credentials: "include"

        });

        if(res.status === 204) {
            dispatch({
                type: FLASHCARD_DELETION_SUCCESS,
                payload: f_id
            });

        }else {
            const errorData = await res.json();
            dispatch({
                type: FLASHCARD_DELETION_FAIL,
                payload: errorData.error || "Failed to delete flashcard"

            });
        }
    } catch(err) {
        dispatch({
            type: FLASHCARD_DELETION_FAIL,
            payload: "Something went wrong while deleting flashcard"
        })
        
    }
}

export const create_flashcard = (f_title) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    }

    const body = JSON.stringify({ f_title });
    
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/create_flashcard`, {
                method: "POST",
                headers: config.headers,
                credentials: "include",
                body: body

            })

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: FLASHCARD_CREATION_SUCCESS,
                payload: data
            });
        } else {
            const errorData = res.json();
            dispatch({
                type: FLASHCARD_CREATION_FAIL,
                payload: errorData
            });
        }
        
    } catch(err) {
        dispatch({
            type: FLASHCARD_CREATION_FAIL,
            payload: "Something went wrong while creating flashcard."
        })
    }
    


}

export const load_flashcards = () => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    };

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/flashcard_list`, {
            method: "GET",
            headers: config.headers,
            credentials: "include"
        });

        if(res.ok) {
            const data = await res.json();

            dispatch({
                type: LOAD_FLASHCARDS_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: LOAD_FLASHCARDS_FAIL,
                payload: "Failed to load flashcards"
            })
        }
        

    } catch(err) {
        dispatch({
            type: LOAD_FLASHCARDS_FAIL,
            payload: "Something went wrong. Please try again."
        })
    }
}