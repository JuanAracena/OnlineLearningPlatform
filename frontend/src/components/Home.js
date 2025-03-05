import "./HomeStyle.css";
import { GrClose } from "react-icons/gr";
import {useState, useEffect} from "react";

function Home() {

    const [isLogin, setIsLogin] = useState(false);
    

    return (
        <div id="background">
            <div id="title_div">
                <h1 id="title">Title</h1>
                <div id="buttons">
                    <button id="login_button" onClick={() => setIsLogin(!isLogin)}>Login</button>
                </div>
                
                
            </div>
            <div id="descr_div">
                <p id="descr">Description</p>
                {/* <video id="video" width="320" height="240" autoPlay loop muted>
                    <source src="https://media.geeksforgeeks.org/wp-content/uploads/20231020155223/Full-Stack-Development-_-LIVE-Classes-_-GeeksforGeeks.mp4" type="video/mp4"></source>
                </video> */}
            </div>

            {isLogin && (
                <div id="login_div" class="hidden">
                    <div id="first_row">
                        <h1 id="login_title">Log In</h1>
                        <button id="close_button" onClick={() => setIsLogin(!isLogin)}><GrClose  id="close_icon"/></button>
                    </div>
                    <form id="second_row"> 
                        <label id="email_label" for="email">Email: </label>
                        <input type="text" id="email" name="email"></input>
                        <label id="password_label" for="password">Password: </label>
                        <input type="password" id="password" name="password"></input>
                        <input type="submit" id="submit_button" value="Submit"></input>
                    </form>
                    
                </div>
            )}
            
        </div>
    );
}

export default Home;