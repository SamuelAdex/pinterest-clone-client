import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './App.css';
import Header from './Components/Header/Header'
import Showcase from './Pages/Showcase';
import Home from './Pages/Home/Home'
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import AddPin from './Pages/AddPin/AddPin';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/EditProfile/EditProfile';



function App() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [dropdown, setDropdown] = useState(false);

  const {userInfo} = useSelector(state=> state.user)

 
  
  return (
    <div className="App">
      {signUpOpen && <Signup signUpOpen={signUpOpen} setLoginOpen={setLoginOpen} setCurrentUser={setCurrentUser} currentUser={currentUser} setSignUpOpen={setSignUpOpen} />}
      {loginOpen && <Login setCurrentUser={setCurrentUser} setSignUpOpen={setSignUpOpen} currentUser={currentUser} loginOpen={loginOpen} setLoginOpen={setLoginOpen} />}
      
      <Header dropdown={dropdown} setDropdown={setDropdown} currentUser={currentUser} loginOpen={loginOpen} setLoginOpen={setLoginOpen} signUpOpen={signUpOpen} setSignUpOpen={setSignUpOpen} />
      <main>
        <Routes>
          {!userInfo && <Route path="/" element={<Showcase />} />}
          {userInfo && <Route path="/home" element={<Home setDropdown={setDropdown} />} />}
          {userInfo && <Route path="/addpin" element={<AddPin />} />}
          {userInfo && <Route path={`/${userInfo.username}`} element={<Profile setDropdown={setDropdown}/>} />}
          {userInfo && <Route path="/editProfile" element={<EditProfile setDropdown={setDropdown} />} />}
        </Routes>
      </main>
    </div>
  );
}

export default App;
