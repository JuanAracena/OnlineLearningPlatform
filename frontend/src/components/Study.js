import { useEffect, useState } from "react";
import "./StudyStyle.css";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { connect } from "react-redux";
import { load_terms } from "../actions/terms";


function Study({ isAuthenticated, load_terms, terms }) {

    
    const navigate = useNavigate();
    const { f_id } = useParams();

    const term = terms.map(item => item.question);
    const def = terms.map(item => item.answer);

    const [currIndex, setCurrIndex] = useState(0);
    const[showTerm, setShowTerm] = useState(true);

    useEffect(() => {
        if(isAuthenticated) {
            load_terms(f_id);
        }
    }, [isAuthenticated, f_id]);

    const handleNext = (event) => {
        event.preventDefault();
        
        setCurrIndex((prev) => (prev + 1) % term.length);
        setShowTerm(true);
    }

    const handlePrev = (event) => {
        event.preventDefault();

        setCurrIndex((prev) => (prev - 1 + term.length) % term.length);
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

                    <button id="term_flashcard" onClick={handleFlip} class="active">{showTerm ? term[currIndex] : def[currIndex]}</button>
                    <button id="prev_btn" onClick={handlePrev} class="active"><GrLinkPrevious id="previous_icon"/></button>
                    <button id="next_btn" onClick={handleNext} class="active"><GrLinkNext id="next_icon"/></button>

                </section>
            </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    terms: state.terms.terms
});

export default connect(mapStateToProps, { load_terms } )(Study);