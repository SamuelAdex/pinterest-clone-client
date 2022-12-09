import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import './Login.css'
import {userLogin} from '../../Api/apiCall'
import {googleAuth} from '../../Api/apiCall'
import pinImg from '../../pinterest.png'
import googleImg from '../../google.png'
import deleteImg from '../../delete.png'

const Login = ({setLoginOpen, setSignUpOpen}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {userInfo, error, pending} = useSelector((state)=> state.user)


    useEffect(()=>{
        if(userInfo){
            setLoginOpen(false)
            navigate("/home")
        }
    }, [userInfo, navigate, setLoginOpen])



    //Handle Login form
    const handleLogin = (e)=>{
        e.preventDefault()

        const data = {
            email, 
            password
        }

        if(!email || !password) return;

        userLogin(data, dispatch)

    }


    const googleSuccess = async (res)=>{        
        /* const result = res?.profileObj; */
        const token = res?.tokenId
        /* const data = {
            username: result?.name,
            email: result?.email,
            avatar: result?.imageUrl,
            token
        } */

        if(token){
            googleAuth(token, dispatch)
        }
    }

  

    const signModal = ()=>{
        setLoginOpen(false)
        setSignUpOpen(true)
    }


    return (
        <section className="login-container">
            <div className="login-wrapper">
                <div className="login">
                    <img src={deleteImg} alt="" onClick={()=> setLoginOpen(false)} className="close-img" />
                    <div className="logo">
                        <img src={pinImg} alt="" />
                    </div>
                    <div className="form-container">
                        <h1>Welcome To Pinterest</h1>
                        <form onSubmit={handleLogin}>
                            <input type="email" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                            <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                            
                            {error && <small style={{color: 'red', margin: '10px', fontWeight: 'bold'}}>{error}</small>}
                            <button type="submit" className={pending ? "loading": "btn"}>Login</button>
                        </form><br />
                        <center>Or</center><br />
                        <GoogleLogin 
                            clientId="940077581329-na0fie2lmjsnihmfer9fdp9dflh2suhe.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <div 
                                className="google-container" 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                /* startIcon={<img src={googleImg} alt="" />} */ >
                                    <img src={googleImg} alt="" />
                                    <span>Continue with Google</span>
                                </div>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleSuccess}
                            cookiePolicy="single_host_origin"
                        />
                        <br />
                        <small>Not a member? <span style={{color: '#D32F2F', fontWeight: 'bold', cursor: 'pointer'}} onClick={signModal}>SignUp</span></small>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
