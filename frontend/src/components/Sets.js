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
import jsonData from "./testData.json";


function Sets() {

    const navigate = useNavigate();

    const [isProfileOpen, setProfileOpen] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [data, setData] = useState(jsonData);

    useEffect(() => {
        if(!data) {
            setData(jsonData);
        }
        console.log("JSON data: ", data);
        console.log("Editing ID: ", editingId);
    }, [])
    
    const redirectToEdit = (event) => {
        event.preventDefault();

        console.log("Redirecting to edit profile page");

        navigate("/edit_profile");

    }

    const handleLogout = (event) => {
        event.preventDefault();

        console.log("Logging out...");
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

    const handleChange = (event) => {
        event.preventDefault();
        console.log("Editing set name...")
    };

    const deleteSet = (event) => {
        event.preventDefault();
        console.log("Deleting set...");
    };

    const createSet = (event) => {
        event.preventDefault();
        console.log("Creating new set...");
    }

    const openSet = (event) => {
        event.preventDefault();
        console.log("Opening set...");
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
                        {data.sets.map((item, index) => {
                            return <li id="sets_id" key={index}>
                                    <section id="li_section">
                                        {editingId === item["id"] ? (
                                            <Fragment>
                                                <input id="editable_input" type="text" defaultValue={item["set_name"]} onChange={handleChange} autoFocus></input>
                                                <button id="confirm_edit_btn" class="active"><IoCheckmarkCircle id="confirm_edit_icon" /></button>
                                                <button id="cancel_edit_btn" onClick={toggleEdit} class="active"><MdCancel id="cancel_edit_icon"/></button>
                                            </Fragment>
                                            
                                        ) : (
                                            <Fragment>
                                                <button id="editable_text" class="active" onClick={openSet}>{item["set_name"]}</button>
                                                <button id="edit_btn" onClick={(e) => toggleEdit(e, item["id"])} class="active"><FaEdit id="edit_set_icon" class="active"/></button>
                                                <button id="delete_btn" onClick={deleteSet} class="active"><MdDelete id="delete_set_icon"/></button>
                                            </Fragment>

                                        )}
                                        
                                    </section>
                                    
                                </li>
                        })}
                        <li id="new_set_li">
                            <button id="new_set_btn" onClick={createSet} class="active"><FaPlus id="new_set_icon" />Create a new set</button>
                        </li>
                            
                        
                    </ul>
                </section>

                {isProfileOpen === true && (
                    <Fragment>
                        <section id="profile_top">
                            <h2 id="profile_name">{data["name"]}</h2>
                            <button id="profile_close_btn" class="active" onClick={toggleProfile}><IoClose id="close_profile_icon" /></button>
                        </section>        

                        <section id="profile_options">
                            <button id="edit_profile" onClick={redirectToEdit} class="active"><FaEdit id="edit_profile_icon"/> Edit profile</button>
                            <button id="logout_btn" onClick={handleLogout} class="active"><MdLogout id="logout_icon" /> Log out</button>
                        </section>

                        <div id="profile_bg"></div>
                    </Fragment>
                    
                )}


            </div>

        </div>
    )
}

export default Sets;