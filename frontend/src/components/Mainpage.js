import "./MainpageStyle.css";
import { useNavigate } from "react-router-dom";

function Mainpage() {

    const navigate = useNavigate();

    const loginRedirect = (event) => {
        event.preventDefault();

        navigate("/login");

    }

    const signupRedirect = (event) => {
        event.preventDefault();
        navigate("/signup");

    }

    return (

        <div id="bg">
            <section id="navbar">
                <h1 id="main_logo">StudyFlow</h1>
                <button id="login_btn" onClick={loginRedirect} class="active">Login</button>
            </section>

            <section id="body">
                <video id="video" autoPlay loop muted>
                    <source src="study_video.mp4" type="video/mp4"></source>
                </video>
                <div id="color_overlay"></div>
                <section id="body_text">
                    <h1 id="main_text">Learn Faster. Remember longer.</h1>
                    <h3 id="main_paragraph">Master any subject with StudyFlow - your all-in-one flashcard platform designed for effective studying. Create, customize, and review flashcards anytime, anywhere with tools that help you stay organized and on track.</h3>
                    <button id="signup_btn" onClick={signupRedirect} class="active">Sign up</button>
                </section>
                
            </section>

            <section id="footer">
                <h3 id="created_by">Created by Juan Aracena</h3>
                <a href="https://github.com/JuanAracena/PersonalWebsite" id="github_link">Source code</a>
            </section>
        </div>

    );

}

export default Mainpage;