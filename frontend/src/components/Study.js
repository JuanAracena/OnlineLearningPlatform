import { useEffect, useState } from "react";
import "./StudyStyle.css";
import termsData from "./termsData.json";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";


function Study() {

    const navigate = useNavigate();
    const [data, setData] = useState(termsData);

    const terms = data.info.map(item => item.question);
    const def = data.info.map(item => item.definition);

    const [currIndex, setCurrIndex] = useState(0);
    const[showTerm, setShowTerm] = useState(true);

    useEffect(() => {
        if(!data){
            setData(termsData);
        }

        console.log("JSON data: ", data);
    }, [])

    const handleNext = (event) => {
        event.preventDefault();
        
        setCurrIndex((prev) => (prev + 1) % terms.length);
        setShowTerm(true);
    }

    const handlePrev = (event) => {
        event.preventDefault();

        setCurrIndex((prev) => (prev - 1 + terms.length) % terms.length);
        setShowTerm(true);
    };

    const handleFlip = (event) => {
        event.preventDefault();
        setShowTerm((prev) => !prev);
    }

    const redirectToHome = (event) => {
        event.preventDefault();
        navigate("/sets");
        
    }


    return (
        <div id="bg">
                <section id="sets_navbar">
                    <h1 id="logo">StudyFlow</h1>
                    <button id="home_btn" class="active" onClick={redirectToHome}><IoMdHome id="home_icon"/></button>
                </section>

                <section id="study_section">

                    <button id="term_flashcard" onClick={handleFlip} class="active">{showTerm ? terms[currIndex] : def[currIndex]}</button>
                    <button id="prev_btn" onClick={handlePrev} class="active"><GrLinkPrevious id="previous_icon"/></button>
                    <button id="next_btn" onClick={handleNext} class="active"><GrLinkNext id="next_icon"/></button>

                    

                </section>
            </div>
    )
}

export default Study;