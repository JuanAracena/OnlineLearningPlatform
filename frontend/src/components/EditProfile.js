import { useEffect, useState } from "react";
import "./EditProfileStyle.css";
import userData from "./userData.json";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



function EditProfile() {

    const [data, setData] = useState(userData);
    const navigate = useNavigate();

    useEffect(() => {
        if(!data) {
            setData(userData);
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Information submitted successfully");
    }

    const deleteAccount = (event) => {
        event.preventDefault();

        console.log("Deleting account...");
    }

    const redirectToSets = (event) => {
        event.preventDefault();

        navigate("/sets");
        
    }

    return (
        <div id="bg">
            <div id="edit_profile_bg">
                <section id="profile_section">
                    <h1 id="profile_title">{data.username}</h1>
                    <button id="profile_close_btn" class="active" onClick={redirectToSets}><IoClose id="close_profile_icon" /></button>
                </section>
                
                <section id="edit_form_section">
                    <form id="profile_form" onSubmit={handleSubmit}>
                        <label id="profile_username_label" for="profile_username">New username: </label>
                        <input id="profile_username" type="text"></input>
                        <label id="profile_email_label" for="email">New email: </label>
                        <input id="profile_email" type="text"></input>
                        <label id="profile_password_label" for="password">New password: </label>
                        <input id="profile_password" type="text"></input>
                    </form>
                </section>

                <button id="profile_confirm_edit_btn" type="submit" form="profile_form" class="active">Done</button>
                <button id="profile_delete_account_btn" onClick={deleteAccount} class="active"><MdDelete id="delete_account_icon"/> Delete account</button>
                
            </div>
                
        </div>
    )
}

export default EditProfile;