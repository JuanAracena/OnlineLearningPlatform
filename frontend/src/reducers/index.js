import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import flashcards from "./flashcards";
import terms from "./terms"

export default combineReducers({
    auth,
    profile,
    flashcards,
    terms
});