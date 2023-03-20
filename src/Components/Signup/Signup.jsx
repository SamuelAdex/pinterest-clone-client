/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './Signup.css'
import pinImg from '../../pinterest.png'
import googleImg from '../../google.png'
import deleteImg from '../../delete.png'
import {userReg} from '../../Api/apiCall'

const Signup = ({setSignUpOpen, setLoginOpen}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {pending, error, userInfo} = useSelector((state)=> state.user)

    
    //UseEffect
    useEffect(()=>{
        if(userInfo){                        
            setSignUpOpen(false)
            navigate("/home")
        }
    }, [userInfo, navigate, setSignUpOpen])


    const handleSignup = (e)=>{
        e.preventDefault();

        const data = {
            username,
            email,
            password,
            age
        }
        if(!email || !password || !username || !age) return;
        userReg(data, dispatch)        
        
    }


    const logModal = ()=>{
        setSignUpOpen(false)
        setLoginOpen(true)
    }

    return (
        <section className="login-container">
            <div className="login-wrapper">
                <img src={deleteImg} alt="" onClick={()=> setSignUpOpen(false)} className="close-img" />
                <div className="logo">
                    <img src={pinImg} alt="" />
                </div>
                <div className="form-container">
                    <h1>Welcome To Pinterest</h1>
                    <small>Find your next idea to try</small>
                    <form onSubmit={handleSignup}>
                        <input type="email" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" placeholder="username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                        <input type="password" placeholder="create a password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                        <input type="text" placeholder="Age" value={age} onChange={(e)=> setAge(e.target.value)} />

                        {error && <small style={{color: 'red', margin: '10px', fontWeight: 'bold'}}>{error}</small>}
                        <button type="submit" className={pending ? "loading": "btn"}>Continue</button>
                    </form><br />
                    <small>Already a member? <span style={{color: '#D32F2F', fontWeight: 'bold', cursor: 'pointer'}} onClick={logModal}>Log In</span></small>
                </div>
            </div>
        </section>
    )
}

export default Signup
