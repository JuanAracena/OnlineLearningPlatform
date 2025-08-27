import "./SignupStyle.css";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function Signup() {
    const navigate = useNavigate();
    
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
        console.log("Creating account...");
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
                    <form id="login_form" onSubmit={sendSignup}>
                        <label id="email_label" for="email">Email: </label>
                        <input id="email" type="text" placeholder="john@gmail.com" required></input>
                        <label id="password_label" for="password">Password: </label>
                        <input id="password" type="password" required></input>
                        <button id="submit_btn2" type="submit" class="active">Sign Up</button>
                    </form>
    
                    <button id="login_page_btn" class="active" onClick={signupRedirect}>Returning User? Log in</button>
                </section>
            </div>
        )

}

export default Signup;