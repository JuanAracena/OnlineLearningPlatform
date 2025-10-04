import { Fragment, useEffect, useState } from "react";
import "./FlashcardStyle.css";
import { IoMdHome } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { connect } from "react-redux";
import { load_terms, create_term, delete_term, update_term } from "../actions/terms";


function Flashcard({ isAuthenticated, terms, load_terms, create_term, delete_term, update_term }) {

    const { f_id, f_title } = useParams();

    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const [isCreationWindowOpen, setCreationWindowOpen] = useState(false);
    const [formData, setFormData] = useState({
        question: "",
        answer: ""
    });

    const { question, answer } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    useEffect(() => {
        
        if(isAuthenticated) {
            load_terms(f_id);
        }

    }, [isAuthenticated, f_id]);

    useEffect(() => {
        
        if(terms.length === 0) {
            console.log("buttons disabled");
            document.getElementById("study_btn").disabled = true;
            document.getElementById("match_btn").disabled = true;
            console.log("buttons disabled");
        } else {
            document.getElementById("study_btn").disabled = false;
            document.getElementById("match_btn").disabled = false;
            console.log("buttons enabled");
        }
        console.log("useEffect activated");

    }, [terms]);

    const redirectToHome = (event) => {
        event.preventDefault();

        navigate("/sets");

    };

    const studyRedirect = (event) => {
        event.preventDefault();
        navigate(`/study/${f_id}`);
    };

    const matchRedirect = (event) => {
        event.preventDefault();
        navigate(`/match/${f_id}`);
    };

    const toggleEdit = (event, id) => {
        event.preventDefault();

        setEditingId(editingId === id ? null : id);
    };

    const handleUpdate = (event, t_id) => {
        event.preventDefault();
        if(question !== "" && answer !== "") {
            update_term(f_id, t_id, question, answer);
            console.log("Term has been updated.");
            setFormData({ 
                question: "", 
                answer: "" 
            });
            setEditingId(null);
        }
    };

    const deleteTerm = (event, t_id) => {
        event.preventDefault();
        delete_term(f_id, t_id);
    };

    const openCreationWindow = (event) => {
        event.preventDefault();
        setCreationWindowOpen(!isCreationWindowOpen);

    };

    const createTerm = (event) => {
        event.preventDefault();

        if(question !== "" && answer !== "") {
            create_term(f_id, question, answer);
            setFormData({
                question: "",
                answer: ""
            });
            setCreationWindowOpen(!isCreationWindowOpen);
        };

    };

    return (
        <div id="bg">
            <div id="terms_bg_grid">
                <section id="sets_navbar">
                    <h1 id="logo">StudyFlow</h1>
                    <button id="home_btn" class="active" onClick={redirectToHome}><IoMdHome id="home_icon"/></button>
                </section>

                <section id="title_section">
                    <h2 id="flashcard_title">{f_title}</h2>
                    <section id="btns_section">
                        <button id="study_btn" class="active" onClick={studyRedirect}>Study</button>
                        <button id="match_btn" class="active" onClick={matchRedirect}>Match</button>
                    </section>
                </section>

                <section id="terms_section">
                    <ul id="f_sets_list" type="none">
                        {terms && terms.map((item, index) => {
                        return <li id="terms_li" key={index}>
                                <form id="terms_li_section" onSubmit={(e) => handleUpdate(e, item.t_id)}>
                                    {editingId === item.t_id ? (
                                        <Fragment>
                                            <input id="editable_term" name="question" defaultValue={item.question} onChange={(e) => onChange(e)} autoFocus></input>
                                            <textarea id="editable_def" name="answer" defaultValue={item.answer} maxLength={300} onChange={(e) => onChange(e)} autoFocus></textarea>
                                            <button id="confirm_edit_btn" type="submit" class="active"><IoCheckmarkCircle id="confirm_edit_icon" /></button>
                                            <button id="cancel_edit_btn" onClick={(e) => {
                                                setFormData({ question: "", answer: "" }); 
                                                toggleEdit(e);

                                            }} class="active"><MdCancel id="cancel_edit_icon"/></button>
                                        </Fragment>

                                    ) : (
                                        <Fragment>
                                            <p id="term_text">{item.question}</p>
                                            <p id="def_text">{item.answer}</p>
                                            <button id="edit_btn" onClick={(e) => {
                                                setFormData({ question: item.question, answer: item.answer }); 
                                                toggleEdit(e, item.t_id);
                                                }} class="active"><FaEdit id="edit_term_icon" class="active"/></button>
                                            <button id="delete_btn" onClick={(e) => deleteTerm(e, item.t_id)} class="active"><MdDelete id="delete_term_icon"/></button>
                                        </Fragment>

                                    )}
                                </form>
                            </li>
                        })}

                        <li id="new_term_li">
                            <button id="new_term_btn" onClick={openCreationWindow} class="active"><FaPlus id="new_term_icon" />Create a new term</button>
                        </li>

                    </ul>
                    
                </section>

                {isCreationWindowOpen === true && (
                    <div id="flashcard_creation_div">
                        <section id="flashcard_creation_section">
                            <form id="term_creation_form" onSubmit={createTerm}>
                                <input id="term_question" name="question" type="type" placeholder="Question"  maxLength={128} onChange={e => onChange(e)} autoFocus required></input>
                                <textarea id="term_answer" name="answer" type="type" placeholder="Answer" maxLength={300} onChange={e => onChange(e)} autoFocus required></textarea>
                                <button id="flashcard_submit_btn" type="submit" class="active">Submit</button>
                                <button id="flashcard_close_btn" onClick={openCreationWindow} class="active"><IoClose id="flashcard_close_profile_icon" /></button>
                            </form>
                        </section>
                    </div>
                    
                )}

            </div>
            
        </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    terms: state.terms.terms
});


export default connect(mapStateToProps, { load_terms, create_term, delete_term, update_term })(Flashcard);
