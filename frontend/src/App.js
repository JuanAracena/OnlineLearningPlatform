import {BrowserRouter, Routes, Route} from "react-router-dom";
import Mainpage from "./components/Mainpage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sets from "./components/Sets";
import Flashcard from "./components/Flashcard";
import Study from "./components/Study";
import EditProfile from "./components/EditProfile";
import Match from "./components/Match";

import { Provider } from "react-redux";
import store from "./store";

import Layout from "./hocs/Layout";
import PrivateRoute from "./hocs/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sets" element={
                <PrivateRoute>
                  <Sets />
                </PrivateRoute>
                
                } />
            <Route path="/edit_profile" element={
              <PrivateRoute>
                <EditProfile /> 
              </PrivateRoute>

              } />
            <Route path="/flashcards/:f_id/:f_title" element={
              <PrivateRoute>
                <Flashcard />
              </PrivateRoute>
              
              } />

            <Route path="/study/:f_id" element={
              <PrivateRoute>
                <Study />
              </PrivateRoute>
              
              } />

            <Route path="/match/:f_id" element={
              <PrivateRoute>
                <Match />
              </PrivateRoute>
              
              } />
            
          </Routes>
        </Layout>
        
      </BrowserRouter>
    </Provider>
      
  );
}

export default App;
