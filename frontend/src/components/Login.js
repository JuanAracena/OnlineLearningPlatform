import "./LoginStyle.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import CSRFToken from "../components/CSRFToken";

function Login({ login, isAuthenticated, error }) {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const navigate = useNavigate();
    
    const closeWindow = (event) => {
        event.preventDefault();
        navigate("/");
    }

    const signupRedirect = (event) => {
        event.preventDefault();
        navigate("/signup");

    }

    const sendLogin = (event) => {
        event.preventDefault();
        login(username, password);
    }

    if (isAuthenticated) {
        navigate("/sets");
    }

    useEffect(() => {
        if(error) {
            alert(error);
        }
    }, [error])



    return (
        <div id="bg">
            <button id="close_btn" onClick={closeWindow} class="active"><IoClose id="close_icon"/></button>
            <section id="login_navbar">
                <h2 id="login_section_h2">Login</h2>
                <h2 id="signup_section_h2">Sign up</h2>
            </section>

            <div id="horizontal_line"></div>

            <section id="form_section">
                <form id="login_form" onSubmit={sendLogin}>
                    <CSRFToken />
                    <label id="username_label" for="username">Username: </label>
                    <input id="username" name="username" type="text" placeholder="John" onChange={e => onChange(e)} required></input>
                    <label id="password_label" for="password">Password: </label>
                    <input id="password" name="password" type="password" onChange={e => onChange(e)} required></input>
                    <button id="submit_btn" type="submit" class="active">Login</button>
                </form>

                <button id="signup_page_btn" class="active" onClick={signupRedirect}>New User? Create an Account</button>
            </section>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
});

export default connect(mapStateToProps, { login })(Login);