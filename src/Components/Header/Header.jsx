import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import ClickOutHandler from 'react-clickout-handler'
import {userLogout}from "../../Api/apiCall"
import './Header.css'
import logo from '../../pinterest.png'
import userImg from '../../user.jpeg'
import searchICO from '../../search.png'
import plusImg from '../../plus.png'

const Header = ({ signUpOpen, setSignUpOpen, loginOpen, setLoginOpen, dropdown, setDropdown}) => {
    
    const dispatch = useDispatch()

    const {userInfo} = useSelector(state => state.user)

    const navigate = useNavigate()
    

    const handleLogout = ()=>{
        userLogout(dispatch)
        navigate("")
    }

    const handleClickOut = ()=>{
        setDropdown(false)
    }

    return (
        <header>
            <nav className={!userInfo ? "navbar": ""}>
                <div className="nav-logo">
                    {userInfo ? <Link to="/home"><img src={logo} alt="" /></Link> : <Link to="/"><img src={logo} alt="" /></Link> }
                    {!userInfo && <Link to="/" style={{textDecoration: "none"}}><span>Pinterest</span></Link>}                
                    {userInfo && <Link to="/home" style={{textDecoration: "none"}}><div>Home</div></Link>}                
                </div>

                {
                    !userInfo && 
                    <div className="nav-menu">
                        <ul>
                            <li>About</li>
                            <li>Business</li>
                            <li>Blog</li>
                            <li className="login" onClick={()=> setLoginOpen(!loginOpen)}>Log in</li>
                            <li className="signin" onClick={()=> setSignUpOpen(!signUpOpen)}>Sign up</li>
                        </ul>                  
                    </div>
                }

                {
                    userInfo &&                    
                    <>
                        <div className="input">
                            <img src={searchICO} alt="" />
                            <input type="text" placeholder="Search" />
                        </div>

                        <div className="nav-profile">
                            <Link to="/addpin" style={{textDecoration: "none"}}><img src={plusImg} alt="" className="add-btn" /></Link>
                            <div className="profile">                                
                                <img src={userImg} alt="" onClick={()=> setDropdown(!dropdown)} />
                                <ClickOutHandler onClickOut={handleClickOut}>
                                    <ul className={dropdown ? "dropdown" : "notDropdown"}>
                                        <Link to={`/${userInfo.username}`} style={{textDecoration: "none", color: 'black'}}><li>Profile</li></Link>
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                </ClickOutHandler>  
                                
                            </div>
                        </div>
                    </>
                    
                }
            </nav>
        </header>
    )
}

export default Header
