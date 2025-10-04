import Cookies from "js-cookie";
import {
    LOAD_TERMS_SUCCESS,
    LOAD_TERMS_FAIL,
    TERM_CREATION_SUCCESS,
    TERM_CREATION_FAIL,
    TERM_DELETION_SUCCESS,
    TERM_DELETION_FAIL,
    TERM_UPDATE_SUCCESS,
    TERM_UPDATE_FAIL
} from "./types"

export const update_term = (f_id, t_id, question, answer) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    };

    const body = JSON.stringify({ question, answer });

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${f_id}/${t_id}/edit_term`, {
            method: "PATCH",
            headers: config.headers,
            credentials: "include",
            body: body
        })

        if(res.ok) {
            const data = await res.json();
            dispatch({
                type: TERM_UPDATE_SUCCESS,
                payload: data
            });

        } else {
            const errorData = await res.json();
            dispatch({
                type: TERM_UPDATE_FAIL,
                error: errorData.error || "Failed to update term"
            });

        }

    } catch(err) {
        dispatch({
            type: TERM_UPDATE_FAIL,
            payload: "Something went wrong while trying to update term"
        });
    }
}

export const delete_term = (f_id, t_id) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    };

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${f_id}/${t_id}/delete_term`, {
            method: "DELETE",
            headers: config.headers,
            credentials: "include"
        })

        if(res.status === 204) {
            dispatch({
                type: TERM_DELETION_SUCCESS,
                payload: t_id

            });
        } else {
            const errorData = await res.json();
            dispatch({
                type: TERM_DELETION_FAIL,
                payload: errorData.error || "Failed to delete term"
            });
        }

    } catch(err) {
        dispatch({
            type: TERM_DELETION_FAIL,
            payload: "Something went wrong while deleting term"
        });
    }
}

export const create_term = (f_id, question, answer) => async dispatch => {
    const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")
            }
        };
    
    const body = JSON.stringify({ question, answer });

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${f_id}/create_term`, {
            method: "POST",
            headers: config.headers,
            credentials: "include",
            body: body
        });

        if(res.ok) {
            const data = await res.json();

            dispatch({
                type: TERM_CREATION_SUCCESS,
                payload: data
            });
        } else {
            const errorData = await res.json();

            dispatch({
                type: TERM_CREATION_FAIL,
                payload: errorData.error || "Failed to create term"
            })
        }


    } catch(err) {
        dispatch({
            type: TERM_CREATION_FAIL,
            payload: "Something went wrong while creating the term"
        })
        
    }
}

export const load_terms = (f_id) => async dispatch => {
    const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")
            }
        };

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${f_id}/term_list`, {
            method: "GET",
            headers: config.headers,
            credentials: "include"
        });

        if(res.ok) {
            const data = await res.json();

            dispatch({
                type: LOAD_TERMS_SUCCESS,
                payload: data
            });

        } else {
            const errorData = await res.json();

            dispatch({
                type: LOAD_TERMS_FAIL,
                payload: errorData.error || "Failed to load term list"

            })
        }

    } catch(err) {
        dispatch({
            type: LOAD_TERMS_FAIL,
            payload: "Something went wrong while loading the term list"

        })
    }
        

}