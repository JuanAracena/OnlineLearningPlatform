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
                <h1 id="logo">StudyFlow</h1>
                <button id="login_btn" onClick={loginRedirect} class="active">Login</button>
            </section>

            <section id="body">
                <video id="video" autoPlay loop muted>
                    <source src="study_video.mp4" type="video/mp4"></source>
                </video>
                <div id="color_overlay"></div>
                <section id="body_text">
                    <h1 id="main_text">Learn Faster. Remember longer.</h1>
                    <h3 id="main_paragraph">Master any subject with "app name"- your all-in-one flashcard platform designed for effective studying. Create, customize, and review flashcards anytime, anywhere with tools that help you stay organized and on track.</h3>
                    <button id="signup_btn" onClick={signupRedirect} class="active">Sign up</button>
                </section>
                
            </section>

            <section id="footer">
                <h3 id="created_by">Created by Juan Aracena</h3>
                <a href="https://github.com/JuanAracena/PersonalWebsite" id="github_link">Source code</a>
            </section>
        </div>

    );



    // const [isLogin, setIsLogin] = useState(false);
    

    // return (
    //     <div id="background">
    //         <div id="title_div">
    //             <h1 id="title">Title</h1>
    //             <div id="buttons">
    //                 <button id="login_button" onClick={() => setIsLogin(!isLogin)}>Login</button>
    //             </div>
                
                
    //         </div>
    //         <div id="descr_div">
    //             <p id="descr">Description</p>
    //             {/* <video id="video" width="320" height="240" autoPlay loop muted>
    //                 <source src="https://media.geeksforgeeks.org/wp-content/uploads/20231020155223/Full-Stack-Development-_-LIVE-Classes-_-GeeksforGeeks.mp4" type="video/mp4"></source>
    //             </video> */}
    //         </div>

    //         {isLogin && (
    //             <div id="login_div" class="hidden">
    //                 <div id="first_row">
    //                     <h1 id="login_title">Log In</h1>
    //                     <button id="close_button" onClick={() => setIsLogin(!isLogin)}><GrClose  id="close_icon"/></button>
    //                 </div>
    //                 <form id="second_row"> 
    //                     <label id="email_label" for="email">Email: </label>
    //                     <input type="text" id="email" name="email"></input>
    //                     <label id="password_label" for="password">Password: </label>
    //                     <input type="password" id="password" name="password"></input>
    //                     <input type="submit" id="submit_button" value="Submit"></input>
    //                 </form>
                    
    //             </div>
    //         )}
            
    //     </div>
    // );
}

export default Mainpage;