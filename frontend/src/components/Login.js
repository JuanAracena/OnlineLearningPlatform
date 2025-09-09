import "./LoginStyle.css";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function Login() {

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
        console.log("Logging in...");
    }



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
                    <label id="username_label" for="username">Username: </label>
                    <input id="username" type="text" placeholder="John" required></input>
                    <label id="password_label" for="password">Password: </label>
                    <input id="password" type="password" required></input>
                    <button id="submit_btn" type="submit" class="active">Login</button>
                </form>

                <button id="signup_page_btn" class="active" onClick={signupRedirect}>New User? Create an Account</button>
            </section>
        </div>
    )
}

export default Login;