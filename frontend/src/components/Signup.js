import "./SignupStyle.css";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import CSRFToken from "../components/CSRFToken";

function Signup({ register, isAuthenticated }) {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: '',
            re_password: ''
        });

    const [accountCreated, setAccountCreated] = useState(false);

    const { username, email, password, re_password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
    
    const closeWindow = (event) => {
        event.preventDefault();
        navigate("/");
    }

    const signupRedirect = (event) => {
        event.preventDefault();
        navigate("/login");

    }

    const sendSignup = (event) => {
        event.preventDefault();

        if(password === re_password) {
            register(username, email, password, re_password);
            setAccountCreated(true);

        }
    }

    if(isAuthenticated) {
        navigate("/sets");

    } else if(accountCreated) {
        navigate("/login");
    }
    
        return (
            <div id="bg">
                <button id="close_btn" onClick={closeWindow} class="active"><IoClose id="close_icon"/></button>
                <section id="login_navbar">
                    <h2 id="login_section_2h2">Login</h2>
                    <h2 id="signup_section_2h2">Sign up</h2>
                </section>
    
                <div id="horizontal_line"></div>
    
                <section id="form_section">
                    <form id="signup_form" onSubmit={sendSignup}>
                        <CSRFToken />
                        <label id="username_label2" for="username2">Username: </label>
                        <input id="username2" name="username" type="text" placeholder="John" onChange={e => onChange(e)} required></input>
                        <label id="email_label2" for="email">Email: </label>
                        <input id="email2" name="email" type="text" placeholder="john@gmail.com" onChange={e => onChange(e)} required></input>
                        <label id="password_label2" for="password">Password: </label>
                        <input id="password2" name="password" type="password" onChange={e => onChange(e)} minLength="6" required></input>
                        <label id="confirm_password_label" for="confirm_password">Verify password: </label>
                        <input id="confirm_password" name="re_password" type="password" onChange={e => onChange(e)} minLength="6" required></input>
                        <button id="submit_btn2" type="submit" class="active">Sign Up</button>
                    </form>
    
                    <button id="login_page_btn" class="active" onClick={signupRedirect}>Returning User? Log in</button>
                </section>
            </div>
        )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Signup);