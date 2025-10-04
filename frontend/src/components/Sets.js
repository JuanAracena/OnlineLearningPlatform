import { useState, useEffect } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./SetsStyle.css";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { create_flashcard, delete_flashcard, load_flashcards, update_flashcard } from "../actions/flashcards";


function Sets({ isAuthenticated, logout, flashcards, username, load_flashcards, create_flashcard, delete_flashcard, update_flashcard }) {

    const navigate = useNavigate();

    const [isProfileOpen, setProfileOpen] = useState(false);

    const [isCreationWindowOpen, setCreationWindowOpen] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        f_title: ''
    });

    const { f_title } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        if (isAuthenticated) {
            load_flashcards();
        }
    }, [isAuthenticated, load_flashcards])
    
    const redirectToEdit = (event) => {
        event.preventDefault();
        navigate("/edit_profile");

    }

    const handleLogout = (event) => {
        event.preventDefault();

        logout();
        navigate("/");

    }

    const toggleProfile = (event) => {
        event.preventDefault();

        setProfileOpen(!isProfileOpen);

        if (isProfileOpen === true) {
            console.log("Profile opened...");

        } else {
            console.log("Profile closed...");
        }
        
    }

    const toggleEdit = (event, id) => {
        event.preventDefault();

        console.log("ID parameter: ", id);
        console.log("New editing ID (before setting it): ", editingId);
        setEditingId(editingId === id ? null : id);
        console.log("New editing ID: ", editingId);
    };

    const handleChange = (event, f_id) => {
        event.preventDefault();

        if(f_title.trim() !== "") {
            update_flashcard(f_id, f_title);
            setFormData({ f_title: "" });
            setEditingId(null);

        }
    };

    const deleteSet = (event, f_id) => {
        event.preventDefault();
        delete_flashcard(f_id);
    };

    const openCreationWindow = (event) => {
        event.preventDefault();
        setCreationWindowOpen(!isCreationWindowOpen);

    }

    const createSet = (event) => {
        event.preventDefault();
        
        if(f_title.trim() !== "") {
            
            create_flashcard(f_title);
            setFormData({ f_title: "" });
            setCreationWindowOpen(!isCreationWindowOpen);

        }
    }

    const openSet = (event, f_id, f_title) => {
        event.preventDefault();
        navigate(`/flashcards/${f_id}/${f_title}`);
    }
    

    return (
        <div id="bg">
            <div id="bg_grid">
                <section id="sets_navbar">
                    <h1 id="logo">StudyFlow</h1>
                    <button id="profile_btn" onClick={toggleProfile} class="active">Profile</button>
                </section>

                <section id="sets_section">
                    <h2 id="sets_title">Your library</h2>
                    
                    <ul id="sets_list" type="none">
                        {flashcards && flashcards.map((item, index) => {
                            return <li id="sets_id" key={index}>
                                    <form id="li_section" onSubmit={(e) => handleChange(e, item["f_id"])}>
                                        {editingId === item["f_id"] ? (
                                            <Fragment>
                                                <input id="editable_input" name="f_title" type="text" defaultValue={item["f_title"]} onChange={e => onChange(e)} autoFocus></input>
                                                <button id="confirm_edit_btn" type="submit" class="active"><IoCheckmarkCircle id="confirm_edit_icon" /></button>
                                                <button id="cancel_edit_btn" onClick={(e) => {
                                                    setFormData({ f_title: "" });
                                                    toggleEdit(e);
                                                }} class="active"><MdCancel id="cancel_edit_icon"/></button>
                                            </Fragment>
                                            
                                        ) : (
                                            <Fragment>
                                                <button id="editable_text" class="active" onClick={(e) => openSet(e, item["f_id"], item["f_title"])}>{item["f_title"]}</button>
                                                <button id="edit_btn" onClick={(e) => {
                                                    setFormData({ f_title: item["f_title"]});
                                                    toggleEdit(e, item["f_id"]);
                                                    }} class="active"><FaEdit id="edit_set_icon" class="active"/></button>
                                                <button id="delete_btn" onClick={(e) => deleteSet(e, item["f_id"])} class="active"><MdDelete id="delete_set_icon"/></button>
                                            </Fragment>

                                        )}
                                        
                                    </form>
                                    
                                </li>
                        })}
                        <li id="new_set_li">
                            <button id="new_set_btn" onClick={openCreationWindow} class="active"><FaPlus id="new_set_icon" />Create a new set</button>
                        </li>
                            
                        
                    </ul>
                </section>

                {isProfileOpen === true && (
                    <Fragment>
                        <section id="profile_top">
                            <h2 id="profile_name">{username}</h2>
                            <button id="profile_close_btn" class="active" onClick={toggleProfile}><IoClose id="close_profile_icon" /></button>
                        </section>        

                        <section id="profile_options">
                            <button id="edit_profile" onClick={redirectToEdit} class="active"><FaEdit id="edit_profile_icon"/> Edit profile</button>
                            <button id="logout_btn" onClick={handleLogout} class="active"><MdLogout id="logout_icon" /> Log out</button>
                        </section>

                        <div id="profile_bg"></div>
                    </Fragment>
                    
                )}

                {isCreationWindowOpen === true && (
                    <div id="flashcard_creation_div">
                        <section id="flashcard_creation_section">
                            <form id="flashcard_creation_form" onSubmit={createSet}>
                                <label id="flashcard_title_label" for="flashcard_title">Flashcard title: </label>
                                <input id="flashcard_title2" name="f_title" type="type" placeholder="Title" onChange={e => onChange(e)} autoFocus required></input>
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
   flashcards: state.flashcards.flashcards,
   username: state.profile.username
});

export default connect(mapStateToProps, { logout, load_flashcards, create_flashcard, delete_flashcard, update_flashcard })(Sets);