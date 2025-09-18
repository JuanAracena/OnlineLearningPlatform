import Cookies from "js-cookie";
import { load_user } from "./profile";
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
} from "./types";

export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/accounts/authenticated`, {
            method: "GET",
            headers: config.headers,
            credentials: "include"
                                   
        })

        const data = await res.json();

        if(data.error || data.isAuthenticated === "error") {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            })
        } else if (data.isAuthenticated === "success") {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            })
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            })
        }

    } catch(err) {
        dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            })
    }
};

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/accounts/login`, {
            method: "POST",
            headers: config.headers,
            body: body,
            credentials: "include"
                                   
        })

        const data = await res.json();

        if(data.success) {
            dispatch({
                type: LOGIN_SUCCESS
            });

            dispatch(load_user());

        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: data.error || "Invalid username or password"
            });
        }

    } catch(err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: "Something went wrong. Please try again."
        });

    }
};

export const logout = () => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    }

    const body = JSON.stringify({
        withCredentials: true
    })

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/accounts/logout`, {
            method: "POST",
            headers: config.headers,
            credentials: "include",
            body: body
        })

        const data = await res.json();

        if(data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            });

        } else {
            dispatch({
                type: LOGOUT_FAIL
            })
        }

    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        })

    }



};

export const register = (username, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    };

    const body = JSON.stringify({ username, email, password, re_password });

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/accounts/register`, {
            method: "POST",
            headers: config.headers,
            body: body,
            credentials: "include"
        });

        const data = await res.json();

        if (data.error) {
            dispatch({
                type: REGISTER_FAIL
            });

        } else {
            dispatch({
                type: REGISTER_SUCCESS
            });
        }

    } catch(err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const delete_account = () => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    };

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/accounts/delete`, {
            method: "DELETE",
            headers: config.headers,
            credentials: "include",
        })

        const data = await res.json();

        if (data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS
            });
        } else {
            dispatch({
                type: DELETE_USER_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: DELETE_USER_FAIL
        });
    }
};