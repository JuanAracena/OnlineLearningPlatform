import { Fragment, useEffect, useState } from "react";
import "./FlashcardStyle.css";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import termsData from "./termsData.json";


function Flashcard() {

    const [data, setData] = useState(termsData);
    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(!data) {
            setData(termsData);
        }

        console.log("JSON data: ", data);

    }, [])

    const redirectToHome = (event) => {
        event.preventDefault();

        navigate("/sets");

    }

    const studyRedirect = (event) => {
        event.preventDefault();
        console.log("Redirecting to Study page...");
    }

    const matchRedirect = (event) => {
        event.preventDefault();
        console.log("Redirecting to Match page...");
    }

    const handleChange = (event) => {
        event.preventDefault();
        console.log("Editing term name...");
    };

    const toggleEdit = (event, id) => {
        event.preventDefault();

        setEditingId(editingId === id ? null : id);
    }

    const deleteTerm = (event) => {
        event.preventDefault();
        console.log("Deleting term...");
    }

    const createTerm = (event) => {
        event.preventDefault();
        console.log("Creating term...");
    }
    return (
        <div id="bg">
            <div id="terms_bg_grid">
                <section id="sets_navbar">
                    <h1 id="logo">StudyFlow</h1>
                    <button id="home_btn" class="active" onClick={redirectToHome}><IoMdHome id="home_icon"/></button>
                </section>

                <section id="title_section">
                    <h2 id="flashcard_title">{data.f_title}</h2>
                    <section id="btns_section">
                        <button id="study_btn" class="active" onClick={studyRedirect}>Study</button>
                        <button id="match_btn" class="active" onClick={matchRedirect}>Match</button>
                    </section>
                </section>

                <section id="terms_section">
                    <ul id="sets_list" type="none">
                        {data.info.map((item, index) => {
                        return <li id="terms_li" key={index}>
                                <section id="terms_li_section">
                                    {editingId === item["id"] ? (
                                        <Fragment>
                                            <input id="editable_term" defaultValue={item["question"]} onChange={handleChange} autoFocus></input>
                                            <input id="editable_def" defaultValue={item["definition"]} onChange={handleChange} autoFocus></input>
                                            <button id="confirm_edit_btn" class="active"><IoCheckmarkCircle id="confirm_edit_icon" /></button>
                                            <button id="cancel_edit_btn" onClick={toggleEdit} class="active"><MdCancel id="cancel_edit_icon"/></button>
                                        </Fragment>

                                    ) : (
                                        <Fragment>
                                            <p id="term_text">{item["question"]}</p>
                                            <p id="def_text">{item["definition"]}</p>
                                            <button id="edit_btn" onClick={(e) => toggleEdit(e, item["id"])} class="active"><FaEdit id="edit_term_icon" class="active"/></button>
                                            <button id="delete_btn" onClick={deleteTerm} class="active"><MdDelete id="delete_term_icon"/></button>
                                        </Fragment>

                                    )}
                                </section>
                            </li>
                        })}

                        <li id="new_term_li">
                            <button id="new_term_btn" onClick={createTerm} class="active"><FaPlus id="new_term_icon" />Create a new term</button>
                        </li>

                    </ul>
                    
                </section>

            </div>
            
        </div>
    )

}

export default Flashcard;
