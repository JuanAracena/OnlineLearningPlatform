import { useEffect, useState } from "react";
import "./EditProfileStyle.css";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { update_profile } from "../actions/profile";
import { delete_account } from "../actions/auth";



function EditProfile({ delete_account, update_profile, username_global, email_global, password_global}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const handleSubmit = (event) => {
        event.preventDefault();

        update_profile(username, email, password);

    }

    const deleteAccount = (event) => {
        event.preventDefault();
        
        delete_account();
        navigate("/login");
    }

    const redirectToSets = (event) => {
        event.preventDefault();

        navigate("/sets");
        
    }

    useEffect(() => {
        setFormData({
            email: email_global,
            password: password_global 
        });
    }, [email_global])

    return (
        <div id="bg">
            <div id="edit_profile_bg">
                <section id="profile_section">
                    <h1 id="profile_title">{username_global}</h1>
                    <button id="profile_close_btn" class="active" onClick={redirectToSets}><IoClose id="close_profile_icon" /></button>
                </section>
                
                <section id="edit_form_section">
                    <form id="profile_form" onSubmit={handleSubmit}>
                        <label id="profile_username_label" for="profile_username">Username: </label>
                        <p id="profile_username" name="username">{username_global}</p>
                        <label id="profile_email_label" for="email">New email: </label>
                        <input id="profile_email" name="email" type="text" onChange={e => onChange(e)} value={email} placeholder={`${email_global}`}></input>
                        <label id="profile_password_label" for="password">New password: </label>
                        <input id="profile_password" name="password" type="text" onChange={e => onChange(e)} value={password}></input>
                    </form>
                </section>

                <button id="profile_confirm_edit_btn" type="submit" form="profile_form" class="active">Done</button>
                <button id="profile_delete_account_btn" onClick={deleteAccount} class="active"><MdDelete id="delete_account_icon"/> Delete account</button>
                
            </div>
                
        </div>
    )
}

const mapStateToProps = state => ({
    username_global: state.profile.username,
    email_global: state.profile.email,
    password_global: state.profile.password
});

export default connect(mapStateToProps, { delete_account, update_profile }) (EditProfile);