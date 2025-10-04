import { useNavigate, useParams } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import "./MatchStyle.css";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { GrLinkNext } from "react-icons/gr";
import { connect } from "react-redux";
import { load_terms } from "../actions/terms";

function Shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function Match({ isAuthenticated, terms, load_terms }) {

    const { f_id } = useParams();

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [curr, setCurr] = useState(0);
    const [selected, setSelected] = useState(null);

    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0); 

    useEffect(() => {
        
        if(isAuthenticated) {
            load_terms(f_id);

            const allDefs = terms.map((s) => s.answer);

            const quizQuestions = terms.map((item) => {
                let wrongDefs = Shuffle(allDefs.filter((def) => def !== item.answer)).slice(0, 3);
                let options = Shuffle([item.answer, ...wrongDefs]);


                return {
                    term: item.question,
                    correct: item.answer,
                    options
                };
            });

            setQuestions(quizQuestions);

            console.log("Quiz questions: ", quizQuestions);
        }
            
    }, [isAuthenticated, f_id]);

    
    
    const question = questions[curr];

    if (!question || !Array.isArray(question.options)) {
        return <p>Loading...</p>;
    }

    console.log("questions: ", questions);


    const handleSelect = (event, option) => {
        event.preventDefault();
        setSelected(option)

        if (option === question.correct) {
            setCorrectCount((c) => c + 1);
        } else {
            setWrongCount((w) => w + 1);
        }
    }

    const nextQuestion = (event) => {
        event.preventDefault();
        setSelected(null);
        setCurr((prev) => (prev + 1) % questions.length);


    }


    const redirectToHome = (event) => {
        event.preventDefault();

        navigate("/sets");
    }


    const resetMatch = (event) => {
        event.preventDefault();
        setCurr(0);
        setCorrectCount(0);
        setWrongCount(0);
        setSelected(null);
    }

    if (correctCount + wrongCount === questions.length) {
        
        return (
            <section id="results_section">
                <h2 id="results_title">Exercise Complete!</h2>
                <p id="results_counter"><IoMdCheckmark id="correct_icon"/> {correctCount} | <IoCloseOutline id="wrong_icon"/> {wrongCount}</p>
                <button id="start_over_btn" onClick={resetMatch} class="active">Start Over</button>
                <button id="results_home_btn" onClick={redirectToHome} class="active">Home</button>

            </section>
        )
    }

    return (
        <div id="bg">
            <section id="sets_navbar">
                <h1 id="logo">StudyFlow</h1>
                <button id="home_btn" class="active" onClick={redirectToHome}><IoMdHome id="home_icon"/></button>
            </section>

            <section id="match_section">
                <progress id="progress_bar" value={correctCount + wrongCount} max={questions.length}></progress>
                <p id="counter"><IoMdCheckmark id="correct_icon"/> {correctCount} | <IoCloseOutline id="wrong_icon"/> {wrongCount}</p>
                <h3 id="term_title">Term: </h3>
                <p id="term_descr">{question.term}</p>
                <h3 id="answer_title">Match the term: </h3>

                <section id="answers_section">
                    {question.options.map((item, index) => {
                        const isPicked = selected === item;
                        const isCorrect = item === question.correct;

                        return <button id="answer_btn" key={index} onClick={(e) => handleSelect(e, item)} disabled={!!selected} className={
                            isPicked
                                ? isCorrect
                                ? "correct"
                                : "wrong"
                                : selected && isCorrect
                                ? "correct"
                                : ""
                            }>{item}</button>
                    })}
                </section>

                {selected && (
                    <button id="match_next_btn" onClick={nextQuestion} class="active"><GrLinkNext id="next_icon"/></button>
                )}


                
            </section>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    terms: state.terms.terms
});

export default connect(mapStateToProps, { load_terms })(Match);