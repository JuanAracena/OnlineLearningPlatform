import Cookies from "js-cookie";
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from "./types";

export const load_user = () => async dispatch => {
    const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")
            }
        };


    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/accounts/user`, {
            method: "GET",
            headers: config.headers,
            credentials: "include"
            });
        

        if(res.status === 200){
            const data = await res.json();
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: data
            });

        } else {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL
            });
        }
            

    } catch(err) {
        dispatch({
            type: LOAD_USER_PROFILE_FAIL
        });

    }
    
};

export const update_profile = (username, email, password) => async dispatch => {
    const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")
            }
        };

    const body = JSON.stringify({
        "withCredentials": true,
        username,
        email,
        password
        
    });

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/accounts/update_user`, {
            method: "PUT",
            headers: config.headers,
            credentials: "include",
            body: body
        })

        const data = await res.json();

        if(data.id && data.username && data.email) {
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: data
            });

        } else {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            });
        }
        

    } catch (err) {
        dispatch({
                type: UPDATE_USER_PROFILE_FAIL
        });
    }
}