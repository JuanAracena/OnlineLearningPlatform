import {BrowserRouter, Routes, Route} from "react-router-dom";
import Mainpage from "./components/Mainpage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sets from "./components/Sets";
import Flashcard from "./components/Flashcard";
import Study from "./components/Study";
import EditProfile from "./components/EditProfile";
import Match from "./components/Match";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/flashcards" element={<Flashcard />} />
        <Route path="/study" element={<Study />} />
        <Route path="/match" element={<Match />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
